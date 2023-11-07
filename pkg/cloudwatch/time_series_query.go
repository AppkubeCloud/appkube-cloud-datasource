package cloudwatch

import (
	"context"
	"fmt"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"golang.org/x/sync/errgroup"

	"github.com/appkube/cloud-datasource/pkg/infra/log"
)

type responseWrapper struct {
	DataResponse *backend.DataResponse
	RefId        string
}

func (e *cloudWatchExecutor) executeTimeSeriesQuery(ctx context.Context, logger log.Logger, req *backend.QueryDataRequest, singleQuery backend.DataQuery) (*backend.QueryDataResponse, error) {
	logger.Debug("Executing time series query")
	resp := backend.NewQueryDataResponse()

	if len(req.Queries) == 0 {
		return nil, fmt.Errorf("request contains no queries")
	}
	// startTime and endTime are always the same for all queries
	startTime := req.Queries[0].TimeRange.From
	endTime := req.Queries[0].TimeRange.To
	if !startTime.Before(endTime) {
		return nil, fmt.Errorf("invalid time range: start time must be before end time")
	}

	//instance, err := e.getInstance(req.PluginContext)
	//if err != nil {
	//	return nil, err
	//}
	flagCloudWatchDynamicLabels := false       // will come as parameter later
	flagCloudWatchCrossAccountQuerying := true // will come as parameter later
	requestQueries, err := models.ParseMetricDataQueries(singleQuery, req.Queries, startTime, endTime, e.AwsCreds.Region,
		flagCloudWatchDynamicLabels,
		flagCloudWatchCrossAccountQuerying)
	if err != nil {
		return nil, err
	}

	//if len(requestQueries) == 0 {
	//	return backend.NewQueryDataResponse(), nil
	//}

	// change for appkube datasource
	var result []*models.CloudWatchQuery
	result = append(result, requestQueries)
	// change for appkube datasource

	requestQueriesByRegion := make(map[string][]*models.CloudWatchQuery)
	//for _, query := range requestQueries {
	if _, exist := requestQueriesByRegion[requestQueries.Region]; !exist {
		//requestQueriesByRegion[requestQueries.Region] = []*models.CloudWatchQuery{}
		// change for appkube datasource
		requestQueriesByRegion[requestQueries.Region] = result
	}
	//requestQueriesByRegion[requestQueries.Region] = append(requestQueriesByRegion[requestQueries.Region], requestQueriesByRegion)
	//}

	resultChan := make(chan *responseWrapper, len(req.Queries))
	eg, ectx := errgroup.WithContext(ctx)
	for r, q := range requestQueriesByRegion {
		requestQueries := q
		region := r
		eg.Go(func() error {
			defer func() {
				if err := recover(); err != nil {
					logger.Error("Execute Get CW Metric Data Query Panic", "error", err, "stack", log.Stack(1))
					if theErr, ok := err.(error); ok {
						resultChan <- &responseWrapper{
							DataResponse: &backend.DataResponse{
								Error: theErr,
							},
						}
					}
				}
			}()

			client, err := e.getCWClient(req.PluginContext, region)
			logger.Info("AWS CW client created: ", client)
			if err != nil {
				logger.Error("Failed to get cloud-watch client. ", err)
				return err
			}

			metricDataInput, err := e.buildMetricDataInput(logger, startTime, endTime, requestQueries)
			logger.Info("AWS CW metric data input created: ", metricDataInput)
			if err != nil {
				logger.Error("Failed to get metric data input. ", err)
				return err
			}

			mdo, err := e.executeRequest(ectx, client, metricDataInput)
			logger.Info("AWS CW request executed : ", mdo)
			if err != nil {
				logger.Error("Failed to execute cloud-watch time series query. ", err)
				return err
			}

			res, err := e.parseResponse(startTime, endTime, mdo, requestQueries)
			logger.Info("AWS CW response parsed : ", res)
			if err != nil {
				logger.Error("Failed to parse cloud-watch metric output. ", err)
				return err
			}

			for _, responseWrapper := range res {
				resultChan <- responseWrapper
			}

			return nil
		})
	}

	if err := eg.Wait(); err != nil {
		logger.Error("AWS CW metric call failed. Error: ", err)
		fmt.Println("AWS CW metric call failed. Error: ", err)
		dataResponse := backend.DataResponse{
			Error: fmt.Errorf("metric request error: %q", err),
		}
		resultChan <- &responseWrapper{
			DataResponse: &dataResponse,
		}
	}
	close(resultChan)

	for result := range resultChan {
		fmt.Println("Accumulating AWS CW result", result.DataResponse)
		resp.Responses[result.RefId] = *result.DataResponse
	}

	return resp, nil
}
