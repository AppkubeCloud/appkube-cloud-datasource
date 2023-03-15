package main

import (
	"context"
	"fmt"
	"github.com/appkube/cloud-datasource/pkg/infinity"
	"github.com/appkube/cloud-datasource/pkg/models"
	"github.com/appkube/cloud-datasource/pkg/pluginhost"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
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
	//err := datasource.Serve(pluginhost.NewDatasource())
	//if err != nil {
	//	log.DefaultLogger.Error(err.Error())
	//	os.Exit(1)
	//}

	// Remove below code. Its only for POC
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
					"type": "appkube-api",
					"source": "url",
					"product": "EMS",
					"environment": "PROD",
					"module": "Admission",
					"serviceType": "java app service",
					"awsxUrl": "%s",
					"cmdbUrl": "%s",
					"accountId": "%s"
				}`, awsxApiUrl, cmdbUrl, accountId)),
	}, *client, map[string]string{}, backend.PluginContext{})
	fmt.Println("Response: ", res.Frames)
}
