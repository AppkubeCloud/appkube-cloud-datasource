package main

import (
	"context"
	"fmt"
	"github.com/appkube/cloud-datasource/pkg/infinity"
	"github.com/appkube/cloud-datasource/pkg/models"
	"github.com/appkube/cloud-datasource/pkg/pluginhost"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"os"
	"time"
)

func main() {
	// Start listening to requests sent from Grafana. This call is blocking so
	// it won't finish until Grafana shuts down the process or the plugin choose
	// to exit by itself using os.Exit. Manage automatically manages life cycle
	// of datasource instances. It accepts datasource instance factory as first
	// argument. This factory will be automatically called on incoming request
	// from Grafana to create different instances of SampleDatasource (per datasource
	// ID). When datasource configuration changed Dispose method will be called and
	// new datasource instance created using NewSampleDatasource factory.

	// default code
	//if err := datasource.Manage("appkube-cloud-datasource", plugin.NewDatasource, datasource.ManageOpts{}); err != nil {
	//	log.DefaultLogger.Error(err.Error())
	//	os.Exit(1)
	//}

	//new code. Need this code only
	err := datasource.Serve(pluginhost.NewDatasource())
	if err != nil {
		log.DefaultLogger.Error(err.Error())
		os.Exit(1)
	}
	//testCloudwatchMetrics()
	//testCloudWatchLogs()
	//testAppkubeMetricsAPIcall()
	//testAppkubeCputUtilization()
}

func testCloudwatchMetrics() {
	fmt.Println("Calling cloudwatch metrics")
	vaultUrl := "http://localhost:5057/api/vault/accountId"
	cmdbUrl := "http://localhost:5057/api/department-product-env/search"
	//awsxApiUrl := "http://localhost:7000/awsx/appconfig?accountId="
	accountId := "657907747545"
	//host := pluginhost.PluginHost{}
	host := pluginhost.NewDatasource().QueryDataHandler

	dt := backend.TimeRange{
		From: time.Date(2000, 11, 17, 20, 34, 58, 651387237, time.UTC),
		To:   time.Now(),
	}

	dataQueryObj := backend.DataQuery{
		JSON: []byte(fmt.Sprintf(`{
						"refId": "A",
						"type": "appkube-cloudwatch",
						"queryType":"timeSeriesQuery",
						"queryMode":"Metrics",
						"source": "url",
						"productId": 1,
						"environmentId": 9329,
						"moduleId": 2,
						"serviceId":2,
						"serviceType": "java app service",
						"cmdbUrl": "%s",
						"vaultUrl":"%s",
						"namespace":  "AWS/EC2",
						"metricName": "CPUUtilization",
						"statistic":  "Average",
						"matchExact": true,
						"expression":"",
						"id":"",
						"alias":"",
						"period":"",
						"metricQueryType":0,
						"metricEditorMode":0,
						"sqlExpression":"",
						"accountId": "%s",
						"elementType":  "EC2",
						"elementId":  9329,
						"cloudIdentifierName":  "i-09ccf4e2e087fa88f",
						"cloudIdentifierId":  "i-09ccf4e2e087fa88f",
						"region":""

					}`, cmdbUrl, vaultUrl, accountId)),
		TimeRange:     dt,
		RefID:         "A",
		MaxDataPoints: 1048,
		Interval:      20000,
	}
	ary := []backend.DataQuery{dataQueryObj}
	req := &backend.QueryDataRequest{
		Queries: ary,
	}
	res, err := host.QueryData(context.Background(), req)
	if err != nil {
		fmt.Println("Error getting QueryData: ", err)
	}
	fmt.Println("Response: ", res)
}
func testCloudWatchLogs() {
	fmt.Println("Calling cloudwatch logs")
	vaultUrl := "http://localhost:5057/api/vault/accountId"
	cmdbUrl := "http://localhost:5057/api/service-detail/search-with-filter"
	//awsxApiUrl := "http://localhost:7000/awsx/appconfig?accountId="
	accountId := "657907747545"
	//host := pluginhost.PluginHost{}
	host := pluginhost.NewDatasource().QueryDataHandler
	fmt.Println("1 host")
	dt := backend.TimeRange{
		From: time.Date(2000, 11, 17, 20, 34, 58, 651387237, time.UTC),
		To:   time.Now(),
	}
	dataQueryObj := backend.DataQuery{
		JSON: []byte(fmt.Sprintf(`{
						"refId": "A",
						"type": "appkube-cloudwatch",
						"queryType":"logAction",
						"source": "url",
						"productId": 1,
						"environmentId": 9329,
						"moduleId": 2,
						"serviceId":2,
						"serviceType": "java app service",
						"cmdbUrl": "%s",
						"vaultUrl":"%s",
						"accountId": "%s",
						"logGroupName":"/aws/lambda/cronlike",
						"logGroupNames":["/aws/lambda/cronlike"],
						"queryString":"filter @message like /error/| stats count() as ErrorCount",
						"subType":"StartQuery",
						"startFromHead":true,
						"elementType":  "EC2",
						"elementId":  9329,
						"cloudIdentifierName":  "i-09ccf4e2e087fa88f",
						"cloudIdentifierId":  "i-09ccf4e2e087fa88f",
						"region":""
					}`, cmdbUrl, vaultUrl, accountId)),
		TimeRange: dt,
	}
	fmt.Println("2 dataQueryObj")
	ary := []backend.DataQuery{dataQueryObj}
	fmt.Println("3 any")
	req := &backend.QueryDataRequest{
		Queries: ary,
	}
	res, err := host.QueryData(context.Background(), req)
	if err != nil {
		fmt.Println("Error getting QueryData: ", err)
	}
	fmt.Println("Response: ", res)
}

func testAppkubeAPIcall() {
	vaultUrl := "http://localhost:5057/api/vault/accountId"
	cmdbUrl := "http://localhost:5057/api/service-detail/search-with-filter"
	awsxApiUrl := "http://localhost:7000/awsx/appconfig?accountId="
	accountId := "657907747545"
	//zone := "us-east-1"
	client, err := infinity.NewClient(models.InfinitySettings{})
	if err != nil {
		fmt.Println("Error getting client: ", err)
	}

	res := pluginhost.QueryData(context.Background(), backend.DataQuery{
		JSON: []byte(fmt.Sprintf(`{
					"type": "appkube-cloudwatch",
					"source": "url",
					"productId": 1,
					"environmentId": 2,
					"moduleId": 2,
					"serviceId":2,
					"serviceType": "java app service",
					"awsxUrl": "%s",
					"cmdbUrl": "%s",
					"vaultUrl":"%s",
					"accountId": "%s"
				}`, awsxApiUrl, cmdbUrl, vaultUrl, accountId)),
	}, *client, map[string]string{}, backend.PluginContext{})
	fmt.Println("Response: ", res.Frames)
}

//
//func testAppkubeCputUtilization() {
//	zone := "us-east-1"
//	externalId := "657907747545"
//	crossAccountRoleArn := "arn:aws:iam::<accountId>:role/CrossAccount"
//	elementType := "EC2"
//	instanceID := "i-05e4e6757f13da657"
//	query := "cpu_utilization_panel"
//	//statistic := "SampleCount"
//	client, err := infinity.NewClient(models.InfinitySettings{})
//	if err != nil {
//		fmt.Println("Error getting client: ", err)
//	}
//	res := pluginhost.QueryData(context.Background(), backend.DataQuery{
//		JSON: []byte(fmt.Sprintf(`{
//					"type": "appkube-api",
//					"source": "url",
//					"productId": 1,
//					"environmentId": 2,
//					"moduleId": 2,
//					"serviceId":2,
//					"serviceType": "java app service",
//					"zone":"%s",
//					"externalId":"%s",
//					"crossAccountRoleArn":"%s",
//					"elementType":"%s",
//					"instanceID":"%s",
//					"query":"%s"
//				}`, zone, externalId, crossAccountRoleArn, elementType, instanceID, query)),
//	}, *client, map[string]string{}, backend.PluginContext{})
//	fmt.Println("Response: ", res.Frames)
//}

func testAppkubeMetricsAPIcall() {
	client, err := infinity.NewClient(models.InfinitySettings{})
	if err != nil {
		fmt.Println("Error getting client: ", err)
	}
	res := pluginhost.QueryData(context.Background(), backend.DataQuery{
		JSON: []byte(`{
   "type": "appkube-metrics",
   "url_options": {
      "method": "POST",
      "data": "{\"zone\":\"us-east-1\",\"externalId\":\"DJ6@a8hzG@xkFwSvLmkSR5SN\",\"crossAccountRoleArn\":\"arn:aws:iam::657907747545:role/CrossAccount\",\"cloudWatchQueries\":[{\"RefID\": \"A\",\"MaxDataPoint\": 100,\"Interval\": 60,\"TimeRange\": {\"From\": \"\",\"To\": \"\",\"TimeZone\": \"UTC\"},\"Query\": [{\"Namespace\": \"AWS/EC2\",\"MetricName\": \"CPUUtilization\",\"Period\": 300,\"Stat\": \"Average\",\"Dimensions\": [{\"Name\": \"InstanceId\",\"Value\": \"i-05e4e6757f13da657\"}]}]}]}"
   }
}


`),
	}, *client, map[string]string{}, backend.PluginContext{})
	fmt.Println("Response:-------- ", res.Frames)
}
