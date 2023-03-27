package routes

import (
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/appkube/cloud-datasource/pkg/tsdb/cloudwatch/models"
	"github.com/appkube/cloud-datasource/pkg/tsdb/cloudwatch/models/resources"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func DimensionValuesHandler(pluginCtx backend.PluginContext, reqCtxFactory models.RequestContextFactoryFunc, parameters url.Values) ([]byte, *models.HttpError) {
	dimensionValuesRequest, err := resources.GetDimensionValuesRequest(parameters)
	if err != nil {
		return nil, models.NewHttpError("error in DimensionValuesHandler", http.StatusBadRequest, err)
	}

	service, err := newListMetricsService(pluginCtx, reqCtxFactory, dimensionValuesRequest.Region)
	if err != nil {
		return nil, models.NewHttpError("error in DimensionValuesHandler", http.StatusInternalServerError, err)
	}

	response, err := service.GetDimensionValuesByDimensionFilter(dimensionValuesRequest)
	if err != nil {
		return nil, models.NewHttpError("error in DimensionValuesHandler", http.StatusInternalServerError, err)
	}

	dimensionValuesResponse, err := json.Marshal(response)
	if err != nil {
		return nil, models.NewHttpError("error in DimensionValuesHandler", http.StatusInternalServerError, err)
	}

	return dimensionValuesResponse, nil
}
