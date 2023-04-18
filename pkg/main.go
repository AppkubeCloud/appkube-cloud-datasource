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
						"type": "appkube-cloudwatch",
						"queryType":"timeSeriesQuery",
						"source": "url",
						"product": "EMS",
						"environment": "PROD",
						"module": "Admission",
						"serviceType": "java app service",
						"cmdbUrl": "%s",
						"vaultUrl":"%s",
						"Namespace":  "AWS/EC2",
						"MetricName": "CPUUtilization",
						"Statistic":  "Average",
						"MatchExact": true,
						"accountId": "%s"

					}`, cmdbUrl, vaultUrl, accountId)),
		TimeRange: dt,
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
						"type": "appkube-cloudwatch",
						"queryType":"logAction",
						"source": "url",
						"product": "EMS",
						"environment": "PROD",
						"module": "Admission",
						"serviceType": "java app service",
						"cmdbUrl": "%s",
						"vaultUrl":"%s",
						"accountId": "%s",
						"logGroupName":"/aws/lambda/cronlike",
						"logGroupNames":["/aws/lambda/cronlike"],
						"queryString":"filter @message like /error/| stats count() as ErrorCount",
						"subType":"StartQuery",
						"startFromHead":true
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

	res := pluginhost.QueryData(nil, 200, context.Background(), backend.DataQuery{
		JSON: []byte(fmt.Sprintf(`{
					"type": "appkube-cloudwatch",
					"source": "url",
					"product": "EMS",
					"environment": "PROD",
					"module": "Admission",
					"serviceType": "java app service",
					"awsxUrl": "%s",
					"cmdbUrl": "%s",
					"vaultUrl":"%s",
					"accountId": "%s"
				}`, awsxApiUrl, cmdbUrl, vaultUrl, accountId)),
	}, *client, map[string]string{}, backend.PluginContext{})
	fmt.Println("Response: ", res.Frames)
}
