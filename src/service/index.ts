const BASE_URL = "http://34.199.12.114:6057";
const GET_CLOUD_ELEMENT = "/api/cloud-element/search";

export const services = {
    getCloudElements: function(id: string) {
        return fetch(`${BASE_URL}${GET_CLOUD_ELEMENT}?id=${id}`)
        .then(response => response.json())
    }
};
