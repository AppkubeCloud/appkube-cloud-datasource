export const SOURCE_VALUE = {
    METRIC: "metric",
    LOG: "log",
    TRACE: "trace",
    API: "api"
};

export enum MetricEditorMode {
    'Builder',
    'Code',
}

export const SOURCE_TYPE = [
    { label: 'Metric', value: SOURCE_VALUE.METRIC },
    { label: 'LOG', value: SOURCE_VALUE.LOG },
    { label: 'Trace', value: SOURCE_VALUE.TRACE },
    { label: 'API', value: SOURCE_VALUE.API }
];

export const METRIC_TYPE = [
    { label: 'INFRA', value: "infra" },
    { label: 'SERVICE', value: "service" },
];

export const DUMMY_PRODUCTS = [
    { label: 'HRMS', value: "hrms" },
    { label: 'Procurement', value: "procurement" },
    { label: 'Supply Chain', value: "supply_chain" },
    { label: 'CMS', value: "cms" },
];

export const DUMMY_ENVS = [
    { label: 'Prod', value: "prod" },
    { label: 'Dev', value: "dev" },
    { label: 'Stage', value: "stage" },
    { label: 'Test', value: "test" },
];

export const DUMMY_MODULES = [
    { label: 'Recruitment', value: "Recruitment" },
    { label: 'Attendance', value: "Attendance" },
    { label: 'Appraisals', value: "Appraisals" },
    { label: 'Salary', value: "Salary" },
    { label: 'Engagement', value: "Engagement" },
    { label: 'Documentation', value: "Documentation" },
];

export const DUMMY_SERVICES = [
    { label: 'Java app', value: "Recruitment" },
    { label: 'RDS Postgres DB', value: "Attendance" },
    { label: 'Open Search DB', value: "Appraisals" },
    { label: 'S3', value: "Salary" },
    { label: 'GitHub', value: "Engagement" },
];

export const DUMMY_METRIC_NAME = [
    { label: 'Metric 1', value: "Metric 1" },
    { label: 'Metric 2', value: "Metric 2" },
    { label: 'Metric 3', value: "Metric 3" },
];

export const DUMMY_STASTISTIC = [
    { label: 'Stastic 1', value: "Stastic 1" },
    { label: 'Stastic 2', value: "Stastic 2" },
    { label: 'Stastic 3', value: "Stastic 3" },
];

export const METRIC_EDITOR_MODES = [
    { label: 'Builder', value: MetricEditorMode.Builder },
    { label: 'Code', value: MetricEditorMode.Code },
];
