package routes

import (
	"encoding/json"
	models2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	resources2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	services2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/services"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func DimensionKeysHandler(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, parameters url.Values) ([]byte, *models2.HttpError) {
	dimensionKeysRequest, err := resources2.GetDimensionKeysRequest(parameters)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionKeyHandler", http.StatusBadRequest, err)
	}

	service, err := newListMetricsService(pluginCtx, reqCtxFactory, dimensionKeysRequest.Region)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionKeyHandler", http.StatusInternalServerError, err)
	}

	var response []resources2.ResourceResponse[string]
	switch dimensionKeysRequest.Type() {
	case resources2.FilterDimensionKeysRequest:
		response, err = service.GetDimensionKeysByDimensionFilter(dimensionKeysRequest)
	default:
		response, err = services2.GetHardCodedDimensionKeysByNamespace(dimensionKeysRequest.Namespace)
	}
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionKeyHandler", http.StatusInternalServerError, err)
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionKeyHandler", http.StatusInternalServerError, err)
	}

	return jsonResponse, nil
}

// newListMetricsService is an list metrics service factory.
//
// Stubbable by tests.
var newListMetricsService = func(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, region string) (models2.ListMetricsProvider, error) {
	metricClient, err := reqCtxFactory(pluginCtx, region)
	if err != nil {
		return nil, err
	}

	return services2.NewListMetricsService(metricClient.MetricsClientProvider), nil
}
