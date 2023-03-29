package routes

import (
	"encoding/json"
	models2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	resources2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/services"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func MetricsHandler(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, parameters url.Values) ([]byte, *models2.HttpError) {
	metricsRequest, err := resources2.GetMetricsRequest(parameters)
	if err != nil {
		return nil, models2.NewHttpError("error in MetricsHandler", http.StatusBadRequest, err)
	}

	service, err := newListMetricsService(pluginCtx, reqCtxFactory, metricsRequest.Region)
	if err != nil {
		return nil, models2.NewHttpError("error in MetricsHandler", http.StatusInternalServerError, err)
	}

	var response []resources2.ResourceResponse[resources2.Metric]
	switch metricsRequest.Type() {
	case resources2.AllMetricsRequestType:
		response = services.GetAllHardCodedMetrics()
	case resources2.MetricsByNamespaceRequestType:
		response, err = services.GetHardCodedMetricsByNamespace(metricsRequest.Namespace)
	case resources2.CustomNamespaceRequestType:
		response, err = service.GetMetricsByNamespace(metricsRequest)
	}
	if err != nil {
		return nil, models2.NewHttpError("error in MetricsHandler", http.StatusInternalServerError, err)
	}

	metricsResponse, err := json.Marshal(response)
	if err != nil {
		return nil, models2.NewHttpError("error in MetricsHandler", http.StatusInternalServerError, err)
	}

	return metricsResponse, nil
}
