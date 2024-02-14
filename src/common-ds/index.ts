export enum MetricEditorMode {
    'Builder',
    'Code',
}

export const RESPONSE_TYPE = [
    { label: 'JSON', value: "JSON" },
    { label: 'Frame', value: "Frame" },
];

export const METRIC_EDITOR_MODES = [
    { label: 'Builder', value: MetricEditorMode.Builder },
    { label: 'Code', value: MetricEditorMode.Code },
];

export const getCloudElementsQuery = function (id: any, cloudElement: any, awsxUrl: string) {
    return {
        "cloudIdentifierName": cloudElement.instanceName,
        "type": "appkube-api",
        "queryMode": "Metrics",
        "matchExact": true,
        "expression": "",
        "id": "",
        "alias": "",
        "period": "",
        "zone": "",
        "externalId": "",
        "crossAccountRoleArn": "",
        "elementType": cloudElement.elementType,
        "elementId": parseInt(id, 10),
        "cloudIdentifierId": cloudElement.instanceId,
        "awsxUrl": awsxUrl
    };
};


export const findParam = (paramName: string, url: string) => {
    if (!url) {
        url = location.href;
    }
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    const regexS = "[\\?&]" + paramName + "=([^&#]*)";
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? "" : results[1];
}
