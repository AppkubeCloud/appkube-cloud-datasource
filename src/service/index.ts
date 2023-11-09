const BASE_URL = "http://34.199.12.114:6057";
const APPKUBE_URL="http://localhost:3001"
const GET_CLOUD_ELEMENT = "/api/cloud-element/search";
const GET_METRICS_LIST = "/api/datasources/aws-namespace";

export const services = {
    getCloudElements: function(id: string) {
        return fetch(`${BASE_URL}${GET_CLOUD_ELEMENT}?id=${id}`)
        .then(response => response.json());
    },
    getMetricsList: function(nameSpace: string) {
        return fetch(`${APPKUBE_URL}${GET_METRICS_LIST}/${nameSpace}`)
        .then(response => response.json());
    }
};
