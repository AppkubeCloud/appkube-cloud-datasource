package routes

import (
	"encoding/json"
	"net/http"
	"net/url"
	"sort"
	"strings"

	"github.com/appkube/cloud-datasource/pkg/tsdb/cloudwatch/models"
	"github.com/appkube/cloud-datasource/pkg/tsdb/cloudwatch/models/resources"
	"github.com/appkube/cloud-datasource/pkg/tsdb/cloudwatch/services"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func NamespacesHandler(pluginCtx backend.PluginContext, reqCtxFactory models.RequestContextFactoryFunc, _ url.Values) ([]byte, *models.HttpError) {
	reqCtx, err := reqCtxFactory(pluginCtx, "default")
	if err != nil {
		return nil, models.NewHttpError("error in NamespacesHandler", http.StatusInternalServerError, err)
	}

	response := services.GetHardCodedNamespaces()
	customNamespace := reqCtx.Settings.Namespace
	if customNamespace != "" {
		customNamespaces := strings.Split(customNamespace, ",")
		for _, customNamespace := range customNamespaces {
			response = append(response, resources.ResourceResponse[string]{Value: customNamespace})
		}
	}
	sort.Slice(response, func(i, j int) bool {
		return response[i].Value < response[j].Value
	})

	namespacesResponse, err := json.Marshal(response)
	if err != nil {
		return nil, models.NewHttpError("error in NamespacesHandler", http.StatusInternalServerError, err)
	}

	return namespacesResponse, nil
}
