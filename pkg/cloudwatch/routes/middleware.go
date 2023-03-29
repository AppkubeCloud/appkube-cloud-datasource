package routes

import (
	models2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"net/http"

	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"

	"github.com/appkube/cloud-datasource/pkg/infra/log"
)

func ResourceRequestMiddleware(handleFunc models2.RouteHandlerFunc, logger log.Logger, reqCtxFactory models2.RequestContextFactoryFunc) func(rw http.ResponseWriter, req *http.Request) {
	return func(rw http.ResponseWriter, req *http.Request) {
		if req.Method != "GET" {
			respondWithError(rw, models2.NewHttpError("Invalid method", http.StatusMethodNotAllowed, nil))
			return
		}

		ctx := req.Context()
		pluginContext := httpadapter.PluginConfigFromContext(ctx)
		json, httpError := handleFunc(pluginContext, reqCtxFactory, req.URL.Query())
		if httpError != nil {
			logger.Error("error handling resource request", "error", httpError.Message)
			respondWithError(rw, httpError)
			return
		}

		rw.Header().Set("Content-Type", "application/json")
		_, err := rw.Write(json)
		if err != nil {
			logger.Error("error handling resource request", "error", err)
			respondWithError(rw, models2.NewHttpError("error writing response in resource request middleware", http.StatusInternalServerError, err))
		}
	}
}
