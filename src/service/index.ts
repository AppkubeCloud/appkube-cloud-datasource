// const BASE_URL = "https://api.synectiks.net/cmdb";
// const APPKUBE_URL="http://localhost:3001"
const GET_CLOUD_ELEMENT = "/cloud-element/search";
const GET_SUPPORTED_PANELS = "/api/datasources/aws-namespace";

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

    getSupportedPanels(nameSpace: string) {
        return fetch(`${this.cmdbEndpoint}${GET_SUPPORTED_PANELS}/${nameSpace}`)
            .then(response => response.json());
    }
}
