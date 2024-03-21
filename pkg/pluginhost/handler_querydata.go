package pluginhost

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch"
	"github.com/appkube/cloud-datasource/pkg/infra/httpclient"
	"github.com/aws/aws-sdk-go/service/cloudwatchlogs"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/appkube/cloud-datasource/pkg/infinity"
	"github.com/appkube/cloud-datasource/pkg/models"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

// QueryData handles multiple queries and returns multiple responses.
func (ds PluginHost) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	response := backend.NewQueryDataResponse()
	client, err := getInstance(ds.im, req.PluginContext) // to be uncomment when local testing done

	//client, err := infinity.NewClient(models.InfinitySettings{})
	if err != nil {
		backend.Logger.Error("error getting infinity instance", "error", err.Error())
		return response, fmt.Errorf("error getting infinity instance. %w", err)
	}
	//backend.Logger.Info("COMPLETE REQUEST :::::::::: ", req)
	for _, q := range req.Queries {
		query, err := models.LoadQueryToIdentifyType(q)

		if err != nil {
			backend.Logger.Error("error un-marshaling the query", "error", err.Error())
			return response, fmt.Errorf("error un-marshaling the query. %w", err)
		}

		switch query.Type {
		case models.QueryTypeAppKubeCloudWatch:
			awsCreds, dataResponse, err2 := createAwsCreds(ctx, req, err, client, query, response)
			if err2 != nil {
				return dataResponse, err2
			}
			var cloudWatchService = cloudwatch.ProvideService(httpclient.NewProvider(), awsCreds)
			res, err := cloudWatchService.Executor.QueryData(ctx, req, q, awsCreds.Region)
			if err != nil {
				backend.Logger.Error("error executing cloudwatch query", "error", err.Error())
				return response, fmt.Errorf("error executing cloudwatch query. %w", err)
			}
			response.Responses[q.RefID] = res.Responses[q.RefID]
		default:
			res := QueryData(ctx, q, *client.client, req.Headers, req.PluginContext)
			response.Responses[q.RefID] = res
		}

	}
	return response, nil
}

func QueryData(ctx context.Context, backendQuery backend.DataQuery, infClient infinity.Client, requestHeaders map[string]string, pluginContext backend.PluginContext) (response backend.DataResponse) {
	//region Loading Query
	query, err := models.LoadQuery(ctx, backendQuery, pluginContext)
	if err != nil {
		backend.Logger.Error("error un-marshaling the query", "error", err.Error())
		response.Error = fmt.Errorf("error un-marshaling the query. %w", err)
		return response
	}
	//endregion
	//region Frame Builder
	switch query.Type {
	//case models.QueryTypeAppKubeAPI:
	//query.URL = fmt.Sprintf(query.AwsxUrl + query.AccountId)
	//query.Type = "json"
	//query.Parser = "backend"
	//fmt.Println("Appconfig url :" + query.URL)
	//frame, err := infinity.GetFrameForURLSources(ctx, query, infClient, requestHeaders)
	//if err != nil {
	//	response.Frames = append(response.Frames, frame)
	//	response.Error = fmt.Errorf("error getting data frame from cloud elements. %w", err)
	//	return response
	//}
	//if frame != nil {
	//	response.Frames = append(response.Frames, frame)
	//}
	case models.QueryTypeAppKubeAPI:
		//apiUrl := fmt.Sprintf("http://localhost:7000/awsx-api/getQueryOutput")
		//apiUrl := fmt.Sprintf(query.AwsxUrl)
		//timeLayout := "2024-01-18T08:48:40.253Z"
		respType := strings.ToLower(query.ResponseType)
		query.Type = "url"
		query.Parser = "backend"
		apiParam := "?elementId=" + strconv.FormatInt(query.ElementId, 10) + "&elementType=" + query.ElementType + "&query=" + query.QueryString
		query.URL = query.AwsxUrl + apiParam

		//query.URL = "http://localhost:7000/awsx-api/getQueryOutput?elementType=EC2&responseType=frame&elementId=900000&query=instance_stop_count_panel&startTime=2024-02-28T00:00:00Z&endTime=2024-02-29T23:59:59Z&logGroupName=CloudTrail/DefaultLogGroup"
		fmt.Println("Appkube awsx url :" + query.URL)
		urlOptions := models.URLOptions{
			Method: "Get",
			Params: []models.URLOptionKeyValuePair{
				{"responseType", respType},
				//{"zone", query.Zone},
				//{"externalId", query.ExternalId},
				//{"crossAccountRoleArn", query.CrossAccountRoleArn},
				{"elementType", query.ElementType},
				{"elementId", strconv.FormatInt(query.ElementId, 10)},
				//{"instanceID", query.CloudIdentifierId},
				{"query", query.QueryString},
				{"startTime", backendQuery.TimeRange.From.Format(time.RFC3339)},
				{"endTime", backendQuery.TimeRange.To.Format(time.RFC3339)},

				//{"responseType", "frame"},
				//{"elementType", "EC2"},
				//{"elementId", "900000"},
				//{"startTime", "2024-02-28T00:00:00Z"},
				//{"endTime", "2024-02-28T23:59:59Z"},
				//{"query", "instance_stop_count_panel"},
			},
		}

		query.URLOptions = urlOptions
		if query.LogGroupName != "" {
			urlResponseObject, _, _, err := infClient.GetResults(ctx, query, requestHeaders)
			//abc,err := http.Get(newUrl)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			responseString, ok := urlResponseObject.(string)
			if !ok {
				backend.Logger.Error("url response cannot be typecast to string", "error")
				return
			}

			var frameInfos []cloudwatchlogs.GetQueryResultsOutput
			if err := json.Unmarshal([]byte(responseString), &frameInfos); err != nil {
				fmt.Println("Error parsing JSON:", err)
				return
			}
			var frameInfo cloudwatchlogs.GetQueryResultsOutput
			for _, frameInfo = range frameInfos {
				frame, err := cloudwatch.LogsResultsToDataframes(&frameInfo)
				if err != nil {
					return backend.DataResponse{}
				}

				response.Frames = append(response.Frames, frame)
			}
		} else {
			frame, err := infinity.GetFrameForURLSources(ctx, query, infClient, requestHeaders)
			if err != nil {
				response.Frames = append(response.Frames, frame)
				response.Error = fmt.Errorf("error getting data frame from cloud elements. %w", err)
				return response
			}
			if respType == "json" {

				response.Frames = append(response.Frames, frame)
			} else if respType == `frame` {
				fmt.Println("creating frames....................................")
				var frameLabels []string

				frameLabels = getFrameNames(query.ElementType, query.QueryString)

				//frameLabels = getFrameNames("cpu_usage_idle_panel")

				responseFrame, err := createResponseFrame(frame, time.RFC3339, frameLabels)
				if err != nil {
					return backend.DataResponse{}
				}
				for _, frame := range responseFrame {
					response.Frames = append(response.Frames, frame)
				}
			}

		}
	case models.QueryTypeAppKubeMetrics:
		apiUrl := fmt.Sprintf("http://localhost:7008/awsx-metric/metric")
		fmt.Println("appkube-metrics api url :" + apiUrl)
		type TimeRange struct {
			From     string `json:"From"`
			To       string `json:"To"`
			TimeZone string `json:"TimeZone"`
		}
		type Dimension struct {
			Name  string `json:"Name"`
			Value string `json:"Value"`
		}
		type Query struct {
			Namespace  string      `json:"Namespace"`
			MetricName string      `json:"MetricName"`
			Period     int         `json:"Period"`
			Stat       string      `json:"Stat"`
			Dimensions []Dimension `json:"Dimensions"`
		}
		type InnerQuery struct {
			RefID        string    `json:"refID"`
			MaxDataPoint int64     `json:"maxDataPoint"`
			Interval     int64     `json:"interval"`
			TimeRange    TimeRange `json:"TimeRange"`
			Query        []Query   `json:"Query"`
		}
		type TopQuery struct {
			Zone                string       `json:"zone"`
			ExternalId          string       `json:"externalId"`
			CrossAccountRoleArn string       `json:"crossAccountRoleArn"`
			CloudWatchQueries   []InnerQuery `json:"cloudWatchQueries"`
		}
		timeRange := TimeRange{From: "", To: "", TimeZone: "UTC"}
		dimension := Dimension{Name: "InstanceId", Value: "i-05e4e6757f13da657"}
		ofQuery := Query{Namespace: "AWS/" + query.Namespace, MetricName: query.MetricName, Period: 300, Stat: *query.Statistic, Dimensions: []Dimension{dimension}}
		innerQuery := InnerQuery{RefID: query.RefID, MaxDataPoint: 100, Interval: 60, TimeRange: timeRange, Query: []Query{ofQuery}}
		topQuery := TopQuery{Zone: "us-east-1", ExternalId: "DJ6@a8hzG@xkFwSvLmkSR5SN", CrossAccountRoleArn: "arn:aws:iam::657907747545:role/CrossAccount", CloudWatchQueries: []InnerQuery{innerQuery}}
		body, err := json.Marshal(topQuery)
		if err != nil {

		}
		urlOptions := models.URLOptions{
			Method: "Post",
			Body:   string(body),
		}

		query.URL = apiUrl
		query.Type = "json"
		query.Parser = "backend"
		query.URLOptions = urlOptions

		frame, err := infinity.GetFrameForURLSources(ctx, query, infClient, requestHeaders)
		if err != nil {
			response.Frames = append(response.Frames, frame)
			response.Error = fmt.Errorf("error getting data frame from cloud elements. %w", err)
			return response
		}
		responseFrame, err := cerateFrameMetric(frame)
		if err != nil {
			return backend.DataResponse{}
		}

		response.Frames = append(response.Frames, responseFrame)
	case models.QueryTypeGSheets:
		sheetId := query.Spreadsheet
		sheetName := query.SheetName
		sheetRange := query.SheetRange
		if sheetName != "" {
			sheetRange = sheetName + "!" + sheetRange
		}
		if sheetId == "" {
			response.Error = errors.New("invalid or empty sheet ID")
			return response
		}
		query.URL = fmt.Sprintf("https://sheets.googleapis.com/v4/spreadsheets/%s?includeGridData=true&ranges=%s", sheetId, sheetRange)
		frame, err := infinity.GetFrameForURLSources(ctx, query, infClient, requestHeaders)
		if err != nil {
			response.Frames = append(response.Frames, frame)
			response.Error = fmt.Errorf("error getting data frame from google sheets. %w", err)
			return response
		}
		if frame != nil {
			response.Frames = append(response.Frames, frame)
		}
	default:
		query, _ := infinity.UpdateQueryWithReferenceData(ctx, query, infClient.Settings)
		switch query.Source {
		case "url":
			frame, err := infinity.GetFrameForURLSources(ctx, query, infClient, requestHeaders)
			if err != nil {
				frame, _ = infinity.WrapMetaForRemoteQuery(ctx, frame, err, query)
				response.Frames = append(response.Frames, frame)
				response.Error = fmt.Errorf("error getting data frame. %w", err)
				return response
			}
			if frame != nil && infClient.Settings.AuthenticationMethod != models.AuthenticationMethodNone && infClient.Settings.AuthenticationMethod != "" && len(infClient.Settings.AllowedHosts) < 1 {
				frame.AppendNotices(data.Notice{
					Text: "Datasource is missing allowed hosts/URLs. Configure it in the datasource settings page for enhanced security.",
				})
			}
			if frame != nil {
				frame, _ = infinity.WrapMetaForRemoteQuery(ctx, frame, nil, query)
				response.Frames = append(response.Frames, frame)
			}
		case "inline":
			frame, err := infinity.GetFrameForInlineSources(query)
			if err != nil {
				frame, _ := infinity.WrapMetaForInlineQuery(frame, err, query)
				response.Frames = append(response.Frames, frame)
				response.Error = fmt.Errorf("error getting data frame from inline data. %w", err)
				return response
			}
			if frame != nil {
				frame, _ := infinity.WrapMetaForInlineQuery(frame, nil, query)
				response.Frames = append(response.Frames, frame)
			}
		default:
			frame := infinity.GetDummyFrame(query)
			if frame != nil {
				response.Frames = append(response.Frames, frame)
			}
		}
	}
	//endregion
	return response
}

func createAwsCreds(ctx context.Context, req *backend.QueryDataRequest, err error, client *instanceSettings, query models.Query, response *backend.QueryDataResponse) (*models.AwsCredential, *backend.QueryDataResponse, error) {
	cmdbResp, cmdbStatusCode, _, err := getCmdbData(ctx, *client.client, query, req.Headers)
	if err != nil {
		backend.Logger.Error("error in getting cmdb response", "error", err.Error())
		return nil, response, fmt.Errorf("error in getting cmdb response. %w", err)
	}
	if cmdbStatusCode > http.StatusBadRequest {
		backend.Logger.Error("cmdb api failed. status: "+strconv.Itoa(cmdbStatusCode), "error", err.Error())
		return nil, response, fmt.Errorf("cmdb api failed. status: "+strconv.Itoa(cmdbStatusCode)+". %w", err)
	}
	vaultResp, vaultStatusCode, _, err := getAwsCredentials(cmdbResp.LandingzoneId, ctx, *client.client, query, req.Headers)
	if err != nil {
		backend.Logger.Error("error in getting aws credentials", "error", err.Error())
		return nil, response, fmt.Errorf("error in getting aws credentials. %w", err)
	}
	if vaultStatusCode/100 != 2 {
		backend.Logger.Error("vault error", "error", vaultStatusCode)
		return nil, response, fmt.Errorf("vault error. %w", vaultStatusCode)
	}

	vaultString, ok := vaultResp.(string)
	if !ok {
		backend.Logger.Error("vault response error", "error")
		return nil, response, fmt.Errorf("vault response error.")
	}
	awsCreds := &models.AwsCredential{}
	err = json.Unmarshal([]byte(vaultString), &awsCreds)
	if err != nil {
		backend.Logger.Error("error un-marshaling the vault response", "error", err.Error())
		return nil, response, fmt.Errorf("error un-marshaling the vault response. %w", err)
	}
	query.Region = awsCreds.Region
	return awsCreds, nil, nil
}
func getCmdbData(ctx context.Context, infClient infinity.Client, query models.Query, requestHeaders map[string]string) (o *models.CmdbCloudElementResponse, statusCode int, duration time.Duration, err error) {
	fmt.Println("Query CMDB to get landing zone")
	query.URL = "http://34.199.12.114:6057/api/cloud-element/search?id=" + strconv.Itoa(int(query.ElementId))
	backend.Logger.Info("CMDB URL: " + query.URL)

	cmdbResp, cmdbStatusCode, duration, err := infClient.GetResults(ctx, query, requestHeaders)
	if err != nil {
		backend.Logger.Error("CMDB call failed. Error: ", "error", err.Error())
		return nil, cmdbStatusCode, duration, err
	}

	cmdbByte := []byte(cmdbResp.(string))
	var out []*models.CmdbCloudElementResponse
	er := json.Unmarshal(cmdbByte, &out)
	if er != nil {
		backend.Logger.Error("error in parsing cmdb response", "error", er.Error())
		return nil, cmdbStatusCode, duration, er
	}
	if len(out) > 0 {
		return out[0], cmdbStatusCode, duration, err
	}
	return nil, cmdbStatusCode, duration, err
}
func getAwsCredentials(landingZoneId int64, ctx context.Context, infClient infinity.Client, query models.Query, requestHeaders map[string]string) (o any, statusCode int, duration time.Duration, err error) {
	fmt.Println("Query vault to get aws credentials")
	query.URL = "http://34.199.12.114:6057/api/landingzone/cloud-creds?landingZoneId=" + strconv.Itoa(int(landingZoneId))
	backend.Logger.Info("VAULT URL: " + query.URL)
	return infClient.GetResults(ctx, query, requestHeaders)
}

func getFrameNames(elementType string, query string) []string {
	type FrameInfo struct {
		Frames interface{} `json:"frames"`
	}

	var frames []string
	baseURL := "https://api.synectiks.net/cmdb/cloud-element-supported-api/search"
	//baseURL := "http://localhost:6057/api/cloud-element-supported-api/search"
	cmdURL := baseURL + "?name=" + query + "&elementType=" + elementType

	// Perform HTTP GET request
	response, err := http.Get(cmdURL)
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}
	defer response.Body.Close()

	// Check if response status is successful
	if response.StatusCode != http.StatusOK {
		fmt.Println("Error: Non-OK HTTP status:", response.Status)
		return nil
	}

	// Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return nil
	}

	var frameInfos []FrameInfo
	if err := json.Unmarshal(body, &frameInfos); err != nil {
		fmt.Println("Error parsing JSON:", err)
		return nil
	}

	for _, info := range frameInfos {
		switch framesData := info.Frames.(type) {
		case string:
			// Split the comma-separated string and append each frame separately
			frames = append(frames, strings.Split(framesData, ",")...)
		case []interface{}:
			for _, frame := range framesData {
				if frameStr, ok := frame.(string); ok {
					frames = append(frames, frameStr)
				}
			}
		}
	}

	return frames
}

func createResponseFrame(frame *data.Frame, timeLayout string, frameLabels []string) ([]*data.Frame, error) {
	var newFrames []*data.Frame

	if frame.Meta != nil && frame.Meta.Custom != nil {
		metaJSON, err := frame.MarshalJSON()
		if err != nil {
			return nil, err
		}

		var customData map[string]interface{}
		if err := json.Unmarshal(metaJSON, &customData); err != nil {
			return nil, err
		}

		layout := timeLayout
		frameNames := frameLabels
		for _, name := range frameNames {
			if schemaVal, ok := customData["schema"]; ok {
				if schema, ok := schemaVal.(map[string]interface{}); ok {
					if metaVal, ok := schema["meta"]; ok {
						if meta, ok := metaVal.(map[string]interface{}); ok {
							if customVal, ok := meta["custom"]; ok {
								if customMap, ok := customVal.(map[string]interface{}); ok {
									if customMap, ok := customMap["data"].(string); ok {
										var dtMap map[string]interface{}
										if err := json.Unmarshal([]byte(customMap), &dtMap); err != nil {
											return nil, err
										}

										newFrame := data.NewFrame(name)
										if customMetric, ok := dtMap[name].(map[string]interface{}); ok {
											if metricData, ok := customMetric["MetricDataResults"]; ok {
												if metrics, ok := metricData.([]interface{}); ok && len(metrics) > 0 {
													timestamps := []*time.Time{}
													points := []*float64{}

													for _, mt := range metrics {
														if metric, ok := mt.(map[string]interface{}); ok {
															tm, _ := metric["Timestamps"].([]interface{})
															val, _ := metric["Values"].([]interface{})

															for _, t := range tm {
																parsedTime, _ := time.Parse(layout, t.(string))
																timestamps = append(timestamps, &parsedTime)
															}

															for _, v := range val {
																if value, ok := v.(float64); ok {
																	points = append(points, &value)
																}
															}
														}
													}

													timeField := data.NewField(data.TimeSeriesTimeFieldName, nil, timestamps)
													valueField := data.NewField(data.TimeSeriesValueFieldName, nil, points)

													newFrame.Fields = append(newFrame.Fields, timeField, valueField)
													newFrames = append(newFrames, newFrame)
												} else {
													return nil, fmt.Errorf("The value of 'MetricDataResults' is not a slice with at least one element")
												}
											} else {
												return nil, fmt.Errorf("Value of 'MetricDataResults' key is not a slice")
											}
										} else {
											return nil, fmt.Errorf("Key '%s' not found or not a map[string]interface{}", name)
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return newFrames, nil
}

func cerateFrameMetric(frame *data.Frame) (*data.Frame, error) {
	newFrame := data.NewFrame("responce_frame")
	if frame.Meta != nil && frame.Meta.Custom != nil {
		metaJSON, err := frame.MarshalJSON()
		if err != nil {
			panic(err)
		}

		var customData map[string]interface{}
		if err := json.Unmarshal(metaJSON, &customData); err != nil {
			panic(err)
		}
		layout := "2006-01-02T15:04:05Z"
		if schemaVal, ok := customData["schema"]; ok {
			if schema, ok := schemaVal.(map[string]interface{}); ok {
				if metaVal, ok := schema["meta"]; ok {
					if meta, ok := metaVal.(map[string]interface{}); ok {
						if metaVal, ok := meta["custom"]; ok {
							if customMap, ok := metaVal.(map[string]interface{}); ok {
								fmt.Println("Value is a map:", customMap)
								customMap, _ := customMap["data"].(map[string]interface{})
								if metricData, ok := customMap["MetricDataResults"]; ok {
									if metrics, ok := metricData.([]interface{}); ok && len(metrics) > 0 {
										timestamps := []*time.Time{}
										points := []*float64{}
										for _, mt := range metrics {
											if metric, ok := mt.(map[string]interface{}); ok {
												tm, _ := metric["Timestamps"].([]interface{})
												val, _ := metric["Values"].([]interface{})
												for _, t := range tm {
													parsedTime, _ := time.Parse(layout, t.(string))
													timestamps = append(timestamps, &parsedTime)
												}
												for _, v := range val {
													if value, ok := v.(float64); ok {
														points = append(points, &value)
													}
												}
											}
										}

										timeField := data.NewField(data.TimeSeriesTimeFieldName, nil, timestamps)
										valueField := data.NewField(data.TimeSeriesValueFieldName, nil, points)
										newFrame.Fields = []*data.Field{
											timeField,
											valueField,
										}
									} else {
										fmt.Println("The value of 'MetricDataResults' is not a slice with at least one element")
									}
								} else {
									fmt.Println("Value of 'MetricDataResults' key is not a map[string]interface{}")
								}
							} else {
								fmt.Println("Value of 'custom' key is not a map[string]interface{}")
							}
						} else {
							fmt.Println("Key 'custom' not found in the meta map")
						}
					} else {
						fmt.Println("Value of 'meta' key is not a map[string]interface{}")
					}
				} else {
					fmt.Println("Key 'meta' not found in 'schema'")
				}
			} else {
				fmt.Println("Value of 'schema' key is not a map[string]interface{}")
			}
		} else {
			fmt.Println("Key 'schema' not found in the data")
		}
	}
	return newFrame, nil
}

//func logsResultsToDataframes(response *cloudwatchlogs.GetQueryResultsOutput) (*data.Frame, error) {
//	if response == nil {
//		return nil, fmt.Errorf("response is nil, cannot convert log results to data frames")
//	}
//
//	nonEmptyRows := make([][]*cloudwatchlogs.ResultField, 0)
//	for _, row := range response.Results {
//		// Sometimes CloudWatch can send empty rows
//		if len(row) == 0 {
//			continue
//		}
//		if len(row) == 1 {
//			if row[0].Value == nil {
//				continue
//			}
//			// Sometimes it sends rows with only timestamp
//			if _, err := time.Parse("2006-01-02 15:04:05.000", *row[0].Value); err == nil {
//				continue
//			}
//		}
//		nonEmptyRows = append(nonEmptyRows, row)
//	}
//
//	rowCount := len(nonEmptyRows)
//
//	fieldValues := make(map[string]interface{})
//
//	// Maintaining a list of field names in the order returned from CloudWatch
//	// as just iterating over fieldValues would not give a consistent order
//	fieldNames := make([]string, 0)
//
//	for i, row := range nonEmptyRows {
//		for _, resultField := range row {
//			// Strip @ptr field from results as it's not needed
//			if *resultField.Field == "@ptr" {
//				continue
//			}
//
//			if _, exists := fieldValues[*resultField.Field]; !exists {
//				fieldNames = append(fieldNames, *resultField.Field)
//
//				// Check if it's a time field
//				if _, err := time.Parse("2006-01-02 15:04:05.000", *resultField.Value); err == nil {
//					fieldValues[*resultField.Field] = make([]*time.Time, rowCount)
//				} else if _, err := strconv.ParseFloat(*resultField.Value, 64); err == nil {
//					fieldValues[*resultField.Field] = make([]*float64, rowCount)
//				} else {
//					fieldValues[*resultField.Field] = make([]*string, rowCount)
//				}
//			}
//
//			if timeField, ok := fieldValues[*resultField.Field].([]*time.Time); ok {
//				parsedTime, err := time.Parse("2006-01-02 15:04:05.000", *resultField.Value)
//				if err != nil {
//					return nil, err
//				}
//
//				timeField[i] = &parsedTime
//			} else if numericField, ok := fieldValues[*resultField.Field].([]*float64); ok {
//				parsedFloat, err := strconv.ParseFloat(*resultField.Value, 64)
//				if err != nil {
//					return nil, err
//				}
//				numericField[i] = &parsedFloat
//			} else {
//				fieldValues[*resultField.Field].([]*string)[i] = resultField.Value
//			}
//		}
//	}
//
//	newFields := make([]*data.Field, 0, len(fieldNames))
//	for _, fieldName := range fieldNames {
//		newFields = append(newFields, data.NewField(fieldName, nil, fieldValues[fieldName]))
//
//		if fieldName == "@timestamp" {
//			newFields[len(newFields)-1].SetConfig(&data.FieldConfig{DisplayName: "Time"})
//		} else if fieldName == "__logstream__grafana_internal__" || fieldName == "__log__grafana_internal__" {
//			newFields[len(newFields)-1].SetConfig(
//				&data.FieldConfig{
//					Custom: map[string]interface{}{
//						"hidden": true,
//					},
//				},
//			)
//		}
//	}
//
//	queryStats := make([]data.QueryStat, 0)
//	if response.Statistics != nil {
//		if response.Statistics.BytesScanned != nil {
//			queryStats = append(queryStats, data.QueryStat{
//				FieldConfig: data.FieldConfig{DisplayName: "Bytes scanned"},
//				Value:       *response.Statistics.BytesScanned,
//			})
//		}
//
//		if response.Statistics.RecordsScanned != nil {
//			queryStats = append(queryStats, data.QueryStat{
//				FieldConfig: data.FieldConfig{DisplayName: "Records scanned"},
//				Value:       *response.Statistics.RecordsScanned,
//			})
//		}
//
//		if response.Statistics.RecordsMatched != nil {
//			queryStats = append(queryStats, data.QueryStat{
//				FieldConfig: data.FieldConfig{DisplayName: "Records matched"},
//				Value:       *response.Statistics.RecordsMatched,
//			})
//		}
//	}
//
//	frame := data.NewFrame("CloudWatchLogsResponse", newFields...)
//	frame.Meta = &data.FrameMeta{
//		Stats:  nil,
//		Custom: nil,
//	}
//
//	if len(queryStats) > 0 {
//		frame.Meta.Stats = queryStats
//	}
//
//	if response.Status != nil {
//		frame.Meta.Custom = map[string]interface{}{
//			"Status": *response.Status,
//		}
//	}
//
//	// Results aren't guaranteed to come ordered by time (ascending), so we need to sort
//	//sort.Sort(ByTime(*frame))
//	return frame, nil
//}
