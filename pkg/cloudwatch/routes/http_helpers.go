package routes

import (
	"encoding/json"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"net/http"
)

func respondWithError(rw http.ResponseWriter, httpError *models.HttpError) {
	response, err := json.Marshal(httpError)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(httpError.StatusCode)
	_, err = rw.Write(response)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
	}
}
