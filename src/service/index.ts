const BASE_URL = "https://api.synectiks.net/cmdb";
const APPKUBE_URL="http://localhost:3001"
const GET_CLOUD_ELEMENT = "/cloud-element/search";
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
