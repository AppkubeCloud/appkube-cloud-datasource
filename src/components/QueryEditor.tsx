import React, { useEffect, useState } from 'react';
import { InlineField, Select, RadioButtonGroup } from '@grafana/ui';
// import { QueryEditorProps } from '@grafana/data';
// import { DataSource } from '../datasource';
// import { MyDataSourceOptions, MyQuery } from '../types';
import {
  SOURCE_TYPE,
  SOURCE_VALUE,
  METRIC_TYPE,
  METRIC_EDITOR_MODES,
  MetricEditorMode
} from '../common-ds';
import { Metric } from './EditorComponents/Metric';
import { Log } from './EditorComponents/Log';
import { Trace } from './EditorComponents/Trace';
import { Api } from './EditorComponents/Api';


export function QueryEditor({ query, onChange, onRunQuery }: any) {

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    (async () => {
      fetch('http://34.199.12.114:5057/api/products')
        .then(response => response.json())
        .then(res => setFetchedData(res))
        .catch(error => console.log(error));
    })();
  }, []);

  useEffect(() => {
    if (!query.JSON) {
      query.JSON = {
        queryType: "",
        source: "",
        productId: null,
        environmentId: null,
        moduleId: null,
        serviceId: null,
        serviceType: "java app service",
        cmdbUrl: "http://localhost:5057/api/department-product-env/search",
        vaultUrl: "http://localhost:5057/api/vault/accountId",
        Namespace: "AWS/EC2",
        MetricName: "CPUUtilization",
        Statistic: "Average",
        MatchExact: true,
        accountId: "%s"
      };
      onChange(query);
    }
  }, [query]);

  const onSourceTypeChange = (value: any) => {
    if (value === 'metric') {
      query.JSON.queryType = 'timeSeriesQuery';
    } else if (value === 'log') {
      query.JSON.queryType = 'logAction';
    }
    onChange({ ...query, sourceType: value });
  };

  const onMetricTypeChange = (value: any) => {
    onChange({ ...query, metricType: value });
  };

  const onEditorModeChange = (newMetricEditorMode: any) => {
    onChange({ ...query, metricEditorMode: newMetricEditorMode });
  };

  const onChangeData = (value: any) => {
    console.log(value);
    onChange({ ...query, JSON: value });
  };

  const {
    sourceType,
    metricType,
    metricEditorMode,
    JSON
  } = query;

  const defaultMetricMode = metricEditorMode ? metricEditorMode : MetricEditorMode.Builder;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <InlineField label="Source Type">
          <Select
            className="min-width-12 width-12"
            value={sourceType}
            options={SOURCE_TYPE}
            onChange={(e) => onSourceTypeChange(e.value)}
            menuShouldPortal={true}
          />
        </InlineField>
        {
          sourceType === SOURCE_VALUE.METRIC ?
            <>
              <InlineField label="Source Type">
                <Select
                  className="min-width-12 width-12"
                  value={metricType}
                  options={METRIC_TYPE}
                  onChange={(e) => onMetricTypeChange(e.value)}
                  menuShouldPortal={true}
                />
              </InlineField>
              <div style={{ display: "block", flexGrow: "1" }} />
              <RadioButtonGroup
                options={METRIC_EDITOR_MODES}
                size="sm"
                value={defaultMetricMode}
                onChange={onEditorModeChange}
              />
            </>
            :
            <></>
        }
      </div>
      <div>
        {
          sourceType === SOURCE_VALUE.METRIC ?
            <Metric
              query={JSON ? JSON : {}}
              onChange={onChangeData}
              editorMode={defaultMetricMode}
              apiData={fetchedData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.LOG ?
            <Log
              query={JSON ? JSON : {}}
              onChange={onChangeData}
              apiData={fetchedData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.TRACE ?
            <Trace
              query={JSON ? JSON : {}}
              onChange={onChangeData}
              apiData={fetchedData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.API ?
            <Api
              query={JSON ? JSON : {}}
              onChange={onChangeData}
              apiData={fetchedData}
            />
            :
            <></>
        }
      </div>
    </div>
  );
}
