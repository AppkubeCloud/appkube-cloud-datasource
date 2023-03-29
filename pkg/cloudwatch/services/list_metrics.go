package services

import (
	"fmt"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	resources2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	"sort"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/cloudwatch"
)

type ListMetricsService struct {
	models.MetricsClientProvider
}

func NewListMetricsService(metricsClient models.MetricsClientProvider) models.ListMetricsProvider {
	return &ListMetricsService{metricsClient}
}

func (l *ListMetricsService) GetDimensionKeysByDimensionFilter(r resources2.DimensionKeysRequest) ([]resources2.ResourceResponse[string], error) {
	input := &cloudwatch.ListMetricsInput{}
	if r.Namespace != "" {
		input.Namespace = aws.String(r.Namespace)
	}
	if r.MetricName != "" {
		input.MetricName = aws.String(r.MetricName)
	}
	setDimensionFilter(input, r.DimensionFilter)
	setAccount(input, r.ResourceRequest)

	metrics, err := l.ListMetricsWithPageLimit(input)
	if err != nil {
		return nil, fmt.Errorf("%v: %w", "unable to call AWS API", err)
	}

	response := []resources2.ResourceResponse[string]{}
	// remove duplicates
	dupCheck := make(map[string]struct{})
	for _, metric := range metrics {
		for _, dim := range metric.Dimensions {
			if _, exists := dupCheck[*dim.Name]; exists {
				continue
			}

			// keys in the dimension filter should not be included
			dimensionFilterExist := false
			for _, d := range r.DimensionFilter {
				if d.Name == *dim.Name {
					dimensionFilterExist = true
					break
				}
			}

			if dimensionFilterExist {
				continue
			}

			dupCheck[*dim.Name] = struct{}{}
			response = append(response, resources2.ResourceResponse[string]{AccountId: metric.AccountId, Value: *dim.Name})
		}
	}

	return response, nil
}

func (l *ListMetricsService) GetDimensionValuesByDimensionFilter(r resources2.DimensionValuesRequest) ([]resources2.ResourceResponse[string], error) {
	input := &cloudwatch.ListMetricsInput{
		Namespace:  aws.String(r.Namespace),
		MetricName: aws.String(r.MetricName),
	}
	setDimensionFilter(input, r.DimensionFilter)
	setAccount(input, r.ResourceRequest)

	metrics, err := l.ListMetricsWithPageLimit(input)
	if err != nil {
		return nil, fmt.Errorf("%v: %w", "unable to call AWS API", err)
	}

	response := []resources2.ResourceResponse[string]{}
	dupCheck := make(map[string]bool)
	for _, metric := range metrics {
		for _, dim := range metric.Dimensions {
			if *dim.Name == r.DimensionKey {
				if _, exists := dupCheck[*dim.Value]; exists {
					continue
				}

				dupCheck[*dim.Value] = true
				response = append(response, resources2.ResourceResponse[string]{AccountId: metric.AccountId, Value: *dim.Value})
			}
		}
	}

	sort.Slice(response, func(i, j int) bool {
		return response[i].Value < response[j].Value
	})
	return response, nil
}

func (l *ListMetricsService) GetMetricsByNamespace(r resources2.MetricsRequest) ([]resources2.ResourceResponse[resources2.Metric], error) {
	input := &cloudwatch.ListMetricsInput{Namespace: aws.String(r.Namespace)}
	setAccount(input, r.ResourceRequest)
	metrics, err := l.ListMetricsWithPageLimit(input)
	if err != nil {
		return nil, err
	}

	response := []resources2.ResourceResponse[resources2.Metric]{}
	dupCheck := make(map[string]struct{})
	for _, metric := range metrics {
		if _, exists := dupCheck[*metric.MetricName]; exists {
			continue
		}
		dupCheck[*metric.MetricName] = struct{}{}
		response = append(response, resources2.ResourceResponse[resources2.Metric]{AccountId: metric.AccountId, Value: resources2.Metric{Name: *metric.MetricName, Namespace: *metric.Namespace}})
	}

	return response, nil
}

func setDimensionFilter(input *cloudwatch.ListMetricsInput, dimensionFilter []*resources2.Dimension) {
	for _, dimension := range dimensionFilter {
		df := &cloudwatch.DimensionFilter{
			Name: aws.String(dimension.Name),
		}
		if dimension.Value != "" {
			df.Value = aws.String(dimension.Value)
		}
		input.Dimensions = append(input.Dimensions, df)
	}
}

func setAccount(input *cloudwatch.ListMetricsInput, r *resources2.ResourceRequest) {
	if r != nil && r.AccountId != nil {
		input.IncludeLinkedAccounts = aws.Bool(true)
		if !r.ShouldTargetAllAccounts() {
			input.OwningAccount = r.AccountId
		}
	}
}
