package models

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

type AwsCredential struct {
	Region              string `json:"region,omitempty"`
	AccessKey           string `json:"accessKey,omitempty"`
	SecretKey           string `json:"secretKey,omitempty"`
	CrossAccountRoleArn string `json:"crossAccountRoleArn,omitempty"`
	ExternalId          string `json:"externalId,omitempty"`
}

type CmdbProductEnvModuleService struct {
	Id                      int64  `json:"id"`
	LandingZone             string `json:"landingZone,omitempty"`
	departmentId            int64  `json:"departmentId"`
	deploymentEnvironmentId int64  `json:"deploymentEnvironmentId"`
	moduleId                int64  `json:"moduleId"`
	servicesId              int64  `json:"servicesId"`
	serviceType             string `json:"serviceType,omitempty"`
	serviceNature           string `json:"serviceNature,omitempty"`
}

type CmdbCloudElementResponse struct {
	Id                       int64                  `json:"id"`
	ElementType              string                 `json:"elementType,omitempty"`
	HostedServices           map[string]interface{} `json:"hostedServices,omitempty"`
	Arn                      string                 `json:"arn,omitempty"`
	InstanceId               string                 `json:"instanceId,omitempty"`
	InstanceName             string                 `json:"instanceName,omitempty"`
	Category                 string                 `json:"category,omitempty"`
	SlaJson                  map[string]interface{} `json:"slaJson,omitempty"`
	CostJson                 map[string]interface{} `json:"costJson,omitempty"`
	ViewJson                 map[string]interface{} `json:"viewJson,omitempty"`
	ConfigJson               map[string]interface{} `json:"configJson,omitempty"`
	ComplianceJson           map[string]interface{} `json:"complianceJson,omitempty"`
	Status                   string                 `json:"status,omitempty"`
	CreatedBy                string                 `json:"createdBy,omitempty"`
	UpdatedBy                string                 `json:"updatedBy,omitempty"`
	CreatedOn                string                 `json:"createdOn,omitempty"`
	UpdatedOn                string                 `json:"updatedOn,omitempty"`
	LandingzoneId            int64                  `json:"landingzoneId"`
	LandingZone              string                 `json:"landingZone,omitempty"`
	DbCategoryId             int64                  `json:"dbCategoryId"`
	DbCategoryName           string                 `json:"dbCategoryName,omitempty"`
	ProductEnclaveId         int64                  `json:"productEnclaveId"`
	ProductEnclaveInstanceId string                 `json:"productEnclaveInstanceId,omitempty"`
}

type QueryType string

const (
	QueryTypeJSON              QueryType = "json"
	QueryTypeCSV               QueryType = "csv"
	QueryTypeTSV               QueryType = "tsv"
	QueryTypeXML               QueryType = "xml"
	QueryTypeGraphQL           QueryType = "graphql"
	QueryTypeHTML              QueryType = "html"
	QueryTypeUQL               QueryType = "uql"
	QueryTypeGROQ              QueryType = "groq"
	QueryTypeGSheets           QueryType = "google-sheets"
	QueryTypeAppKubeAPI        QueryType = "appkube-api"
	QueryTypeAppKubeCloudWatch QueryType = "appkube-cloudwatch"
)

type InfinityParser string

const (
	InfinityParserSimple  InfinityParser = "simple"
	InfinityParserBackend InfinityParser = "backend"
	InfinityParserSQLite  InfinityParser = "sqlite"
	InfinityParserUQL     InfinityParser = "uql"
	InfinityParserGROQ    InfinityParser = "groq"
)

type Query struct {
	RefID               string                   `json:"refId"`
	Type                QueryType                `json:"type"`   // 'json' | 'json-backend' | 'csv' | 'tsv' | 'xml' | 'graphql' | 'html' | 'uql' | 'groq' | 'series' | 'global' | 'google-sheets'
	Format              string                   `json:"format"` // 'table' | 'timeseries' | 'dataframe' | 'as-is' | 'node-graph-nodes' | 'node-graph-edges'
	Source              string                   `json:"source"` // 'url' | 'inline' | 'reference' | 'random-walk' | 'expression'
	RefName             string                   `json:"referenceName,omitempty"`
	URL                 string                   `json:"url"`
	URLOptions          URLOptions               `json:"url_options"`
	Data                string                   `json:"data"`
	Parser              InfinityParser           `json:"parser"` // 'simple' | 'backend' | 'sqlite' | 'uql' | 'groq'
	FilterExpression    string                   `json:"filterExpression"`
	SummarizeExpression string                   `json:"summarizeExpression"`
	SummarizeBy         string                   `json:"summarizeBy"`
	UQL                 string                   `json:"uql"`
	GROQ                string                   `json:"groq"`
	SQLiteQuery         string                   `json:"sqlite_query"`
	CSVOptions          InfinityCSVOptions       `json:"csv_options"`
	JSONOptions         InfinityJSONOptions      `json:"json_options"`
	RootSelector        string                   `json:"root_selector"`
	Columns             []InfinityColumn         `json:"columns"`
	ComputedColumns     []InfinityColumn         `json:"computed_columns"`
	Filters             []InfinityFilter         `json:"filters"`
	SeriesCount         int64                    `json:"seriesCount"`
	Expression          string                   `json:"expression"`
	Alias               string                   `json:"alias"`
	DataOverrides       []InfinityDataOverride   `json:"dataOverrides"`
	GlobalQueryID       string                   `json:"global_query_id"`
	QueryMode           string                   `json:"query_mode"`
	Spreadsheet         string                   `json:"spreadsheet,omitempty"`
	SheetName           string                   `json:"sheetName,omitempty"`
	SheetRange          string                   `json:"range,omitempty"`
	ElementType         string                   `json:"elementType,omitempty"`
	ElementId           int64                    `json:"elementId,omitempty"`
	CloudIdentifierName string                   `json:"cloudIdentifierName,omitempty"`
	CloudIdentifierId   string                   `json:"cloudIdentifierId,omitempty"`
	ProductId           int64                    `json:"productId,omitempty"`
	EnvironmentId       int64                    `json:"environmentId,omitempty"`
	ModuleId            int64                    `json:"moduleId,omitempty"`
	ServiceId           int64                    `json:"serviceId"`
	ServiceType         string                   `json:"serviceType,omitempty"`
	ServiceNature       string                   `json:"serviceNature,omitempty"`
	AwsxUrl             string                   `json:"awsxUrl,omitempty"`
	CmdbUrl             string                   `json:"cmdbUrl,omitempty"`
	VaultUrl            string                   `json:"vaultUrl,omitempty"`
	AccountId           string                   `json:"accountId,omitempty"`
	Zone                string                   `json:"zone,omitempty"`
	LogType             string                   `json:"logType,omitempty"`
	SubType             string                   `json:"subType,omitempty"`
	Limit               *int64                   `json:"limit"`
	Time                int64                    `json:"time"`
	StartTime           *int64                   `json:"startTime"`
	EndTime             *int64                   `json:"endTime"`
	LogGroupName        string                   `json:"logGroupName,omitempty"`
	LogGroupNames       []string                 `json:"logGroupNames"`
	LogGroups           []suggestData            `json:"logGroups"`
	LogGroupNamePrefix  string                   `json:"logGroupNamePrefix,omitempty"`
	LogStreamName       string                   `json:"logStreamName,omitempty"`
	StartFromHead       bool                     `json:"startFromHead"`
	Region              string                   `json:"region,omitempty"`
	QueryString         string                   `json:"queryString,omitempty"`
	QueryId             string                   `json:"queryId,omitempty"`
	StatsGroups         []string                 `json:"statsGroups"`
	Subtype             string                   `json:"subtype,omitempty"`
	QueryType           string                   `json:"queryType,omitempty"`
	PrefixMatching      bool                     `json:"prefixMatching"`
	Namespace           string                   `json:"namespace,omitempty"`
	MetricName          string                   `json:"metricName,omitempty"`
	Dimensions          map[string]interface{}   `json:"dimensions"`
	Statistic           *string                  `json:"statistic,omitempty"`
	Period              string                   `json:"period,omitempty"`
	ActionPrefix        string                   `json:"actionPrefix,omitempty"`
	AlarmNamePrefix     string                   `json:"alarmNamePrefix,omitempty"`
	Profile             string                   `json:"profile,omitempty"`
	Label               *string                  `json:"label"`
	Id                  string                   `json:"id"`
	MatchExact          *bool                    `json:"matchExact"`
	MetricEditorMode    *models.MetricEditorMode `json:"metricEditorMode"`
	MetricQueryType     models.MetricQueryType   `json:"metricQueryType"`
	SqlExpression       string                   `json:"sqlExpression"`
	Statistics          []*string                `json:"statistics"`
	TimezoneUTCOffset   string                   `json:"timezoneUTCOffset"`
	Hide                *bool                    `json:"hide"`
}

// It's copied from metric_find_query.go
type suggestData struct {
	Text  string `json:"text"`
	Value string `json:"value"`
	Label string `json:"label,omitempty"`
}

type URLOptionKeyValuePair struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type URLOptions struct {
	Method           string                  `json:"method"` // 'GET' | 'POST'
	Params           []URLOptionKeyValuePair `json:"params"`
	Headers          []URLOptionKeyValuePair `json:"headers"`
	Body             string                  `json:"data"`
	BodyType         string                  `json:"body_type"`
	BodyContentType  string                  `json:"body_content_type"`
	BodyForm         []URLOptionKeyValuePair `json:"body_form"`
	BodyGraphQLQuery string                  `json:"body_graphql_query"`
	// BodyGraphQLVariables string           `json:"body_graphql_variables"`
}

type InfinityCSVOptions struct {
	Delimiter          string `json:"delimiter"`
	SkipEmptyLines     bool   `json:"skip_empty_lines"`
	SkipLinesWithError bool   `json:"skip_lines_with_error"`
	RelaxColumnCount   bool   `json:"relax_column_count"`
	Columns            string `json:"columns"`
	Comment            string `json:"comment"`
}

type InfinityJSONOptions struct {
	RootIsNotArray bool `json:"root_is_not_array"`
	ColumnNar      bool `json:"columnar"`
}

type InfinityColumn struct {
	Selector        string `json:"selector"`
	Text            string `json:"text"`
	Type            string `json:"type"` // "string" | "number" | "timestamp" | "timestamp_epoch" | "timestamp_epoch_s"
	TimeStampFormat string `json:"timestampFormat"`
}

type InfinityFilter struct {
	Field    string   `json:"field"`
	Operator string   `json:"operator"`
	Value    []string `json:"value"`
}

type InfinityDataOverride struct {
	Values   []string `json:"values"`
	Operator string   `json:"operator"`
	Override string   `json:"override"`
}

func ApplyDefaultsToQuery(ctx context.Context, query Query) Query {
	if query.Type == "" {
		query.Type = QueryTypeJSON
		if query.Source == "" {
			query.Source = "url"
		}
	}
	if query.Type == QueryTypeJSON && query.Source == "inline" && query.Data == "" {
		query.Data = "[]"
	}
	if (query.Type == QueryTypeJSON || query.Type == QueryTypeGraphQL || query.Type == QueryTypeUQL || query.Type == QueryTypeGROQ) && query.Source == "url" && query.URL == "" {
		query.URL = "https://raw.githubusercontent.com/yesoreyeram/grafana-infinity-datasource/main/testdata/users.json"
	}
	if query.Type == QueryTypeCSV && query.Source == "url" && query.URL == "" {
		query.URL = "https://raw.githubusercontent.com/yesoreyeram/grafana-infinity-datasource/main/testdata/users.csv"
	}
	if query.Type == QueryTypeTSV && query.Source == "url" && query.URL == "" {
		query.URL = "https://raw.githubusercontent.com/yesoreyeram/grafana-infinity-datasource/main/testdata/users.tsv"
	}
	if query.Type == QueryTypeXML && query.Source == "url" && query.URL == "" {
		query.URL = "https://raw.githubusercontent.com/yesoreyeram/grafana-infinity-datasource/main/testdata/users.xml"
	}
	if query.Type == QueryTypeHTML && query.Source == "url" && query.URL == "" {
		query.URL = "https://raw.githubusercontent.com/yesoreyeram/grafana-infinity-datasource/main/testdata/users.html"
	}
	if query.Source == "url" && strings.ToUpper(query.URLOptions.Method) == "POST" {
		if query.URLOptions.BodyType == "" {
			query.URLOptions.BodyType = "raw"
			if query.Type == QueryTypeGraphQL {
				query.URLOptions.BodyType = "graphql"
				query.URLOptions.BodyContentType = "application/json"
				if query.URLOptions.BodyGraphQLQuery == "" {
					query.URLOptions.BodyGraphQLQuery = query.URLOptions.Body
				}
			}
		}
		if query.URLOptions.BodyContentType == "" {
			query.URLOptions.BodyContentType = "text/plain"
		}
	}
	if query.Type == QueryTypeJSON && query.Parser == InfinityParserUQL && query.UQL == "" {
		query.UQL = "parse-json"
	}
	if query.Type == QueryTypeCSV && query.Parser == InfinityParserUQL && query.UQL == "" {
		query.UQL = "parse-csv"
	}
	if query.Type == QueryTypeTSV && query.Parser == InfinityParserUQL && query.UQL == "" {
		query.UQL = `parse-csv --delimiter "\t"`
	}
	if query.Type == QueryTypeXML && query.Parser == InfinityParserUQL && query.UQL == "" {
		query.UQL = "parse-xml"
	}
	if query.Type == QueryTypeJSON && query.Parser == InfinityParserGROQ && query.GROQ == "" {
		query.GROQ = "*"
	}
	if query.Columns == nil {
		query.Columns = []InfinityColumn{}
	}
	if query.ComputedColumns == nil {
		query.ComputedColumns = []InfinityColumn{}
	}
	return query
}

func LoadQuery(ctx context.Context, backendQuery backend.DataQuery, pluginContext backend.PluginContext) (Query, error) {
	var query Query
	err := json.Unmarshal(backendQuery.JSON, &query)
	if err != nil {
		return query, fmt.Errorf("error while parsing the query json. %s", err.Error())
	}
	query = ApplyDefaultsToQuery(ctx, query)
	return ApplyMacros(ctx, query, backendQuery.TimeRange, pluginContext)
}

// Changes to merge cloudwatch datasource
func LoadQueryToIdentifyType(backendQuery backend.DataQuery) (Query, error) {
	var query Query
	//var dataQuery backend.DataQuery
	//err := json.Unmarshal(backendQuery, &dataQuery)
	//if err != nil {
	//	return query, fmt.Errorf("error while parsing the query json. %s", err.Error())
	//}

	err1 := json.Unmarshal(backendQuery.JSON, &query)
	if err1 != nil {
		return query, fmt.Errorf("error in unmarshalling query JSON. %s", err1.Error())
	}
	return query, err1
}
