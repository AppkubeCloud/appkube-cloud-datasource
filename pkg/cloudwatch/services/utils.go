package services

import (
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	"strings"
)

func valuesToListMetricRespone[T any](values []T) []resources.ResourceResponse[T] {
	var response []resources.ResourceResponse[T]
	for _, value := range values {
		response = append(response, resources.ResourceResponse[T]{Value: value})
	}

	return response
}

func getAccountId(arn string) string {
	// format: arn:partition:service:region:account-id:resource-id
	parts := strings.Split(arn, ":")

	if len(parts) >= 4 {
		return parts[4]
	}

	return ""
}
