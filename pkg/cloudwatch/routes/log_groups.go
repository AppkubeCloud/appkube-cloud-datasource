package routes

import (
	"encoding/json"
	models2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/services"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func LogGroupsHandler(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, parameters url.Values) ([]byte, *models2.HttpError) {
	request, err := resources.ParseLogGroupsRequest(parameters)
	if err != nil {
		return nil, models2.NewHttpError("cannot set both log group name prefix and pattern", http.StatusBadRequest, err)
	}

	service, err := newLogGroupsService(pluginCtx, reqCtxFactory, request.Region)
	if err != nil {
		return nil, models2.NewHttpError("newLogGroupsService error", http.StatusInternalServerError, err)
	}

	logGroups, err := service.GetLogGroups(request)
	if err != nil {
		return nil, models2.NewHttpError("GetLogGroups error", http.StatusInternalServerError, err)
	}

	logGroupsResponse, err := json.Marshal(logGroups)
	if err != nil {
		return nil, models2.NewHttpError("LogGroupsHandler json error", http.StatusInternalServerError, err)
	}

	return logGroupsResponse, nil
}

// newLogGroupsService is a describe log groups service factory.
//
// Stubbable by tests.
var newLogGroupsService = func(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, region string) (models2.LogGroupsProvider, error) {
	reqCtx, err := reqCtxFactory(pluginCtx, region)
	if err != nil {
		return nil, err
	}
	isCrossAccountEnabled := true
	return services.NewLogGroupsService(reqCtx.LogsAPIProvider, isCrossAccountEnabled), nil
}
