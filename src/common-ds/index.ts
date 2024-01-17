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
