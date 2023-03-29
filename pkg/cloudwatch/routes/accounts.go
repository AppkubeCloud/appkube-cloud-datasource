package routes

import (
	"encoding/json"
	"errors"
	"fmt"
	models2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/services"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func AccountsHandler(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, parameters url.Values) ([]byte, *models2.HttpError) {
	region := parameters.Get("region")
	if region == "" {
		return nil, models2.NewHttpError("error in AccountsHandler", http.StatusBadRequest, fmt.Errorf("region is required"))
	}

	service, err := newAccountsService(pluginCtx, reqCtxFactory, region)
	if err != nil {
		return nil, models2.NewHttpError("error in AccountsHandler", http.StatusInternalServerError, err)
	}

	accounts, err := service.GetAccountsForCurrentUserOrRole()
	if err != nil {
		msg := "error getting accounts for current user or role"
		switch {
		case errors.Is(err, services.ErrAccessDeniedException):
			return nil, models2.NewHttpError(msg, http.StatusForbidden, err)
		default:
			return nil, models2.NewHttpError(msg, http.StatusInternalServerError, err)
		}
	}

	accountsResponse, err := json.Marshal(accounts)
	if err != nil {
		return nil, models2.NewHttpError("error in AccountsHandler", http.StatusInternalServerError, err)
	}

	return accountsResponse, nil
}

// newAccountService is an account service factory.
//
// Stubbable by tests.
var newAccountsService = func(pluginCtx backend.PluginContext, reqCtxFactory models2.RequestContextFactoryFunc, region string) (models2.AccountsProvider, error) {
	oamClient, err := reqCtxFactory(pluginCtx, region)
	if err != nil {
		return nil, err
	}

	return services.NewAccountsService(oamClient.OAMClientProvider), nil
}
