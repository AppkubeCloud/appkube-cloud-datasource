package routes

import (
	"encoding/json"
	models2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func DimensionValuesHandler(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, parameters url.Values) ([]byte, *models2.HttpError) {
	dimensionValuesRequest, err := resources.GetDimensionValuesRequest(parameters)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionValuesHandler", http.StatusBadRequest, err)
	}

	service, err := newListMetricsService(pluginCtx, reqCtxFactory, dimensionValuesRequest.Region)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionValuesHandler", http.StatusInternalServerError, err)
	}

	response, err := service.GetDimensionValuesByDimensionFilter(dimensionValuesRequest)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionValuesHandler", http.StatusInternalServerError, err)
	}

	dimensionValuesResponse, err := json.Marshal(response)
	if err != nil {
		return nil, models2.NewHttpError("error in DimensionValuesHandler", http.StatusInternalServerError, err)
	}

	return dimensionValuesResponse, nil
}
