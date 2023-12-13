// const BASE_URL = "https://api.synectiks.net/cmdb";
// const APPKUBE_URL="http://localhost:3001"
const GET_CLOUD_ELEMENT = "/cloud-element/search";
const GET_METRICS_LIST = "/api/datasources/aws-namespace";

export class Services {
    cmdbEndpoint="";
    grafanaEndpoint="";
    constructor(cmdbEndpoint: string, grafanaEndpoint: string) {
        this.cmdbEndpoint = cmdbEndpoint;
        this.grafanaEndpoint = grafanaEndpoint;
    }

    getCloudElements(id: string) {
        return fetch(`${this.cmdbEndpoint}${GET_CLOUD_ELEMENT}?id=${id}`)
            .then(response => response.json());
    }

    getMetricsList(nameSpace: string) {
        return fetch(`${this.grafanaEndpoint}${GET_METRICS_LIST}/${nameSpace}`)
            .then(response => response.json());
    }
}