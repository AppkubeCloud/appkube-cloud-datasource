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
    })()
  }, [])

  const onSourceTypeChange = (value: any) => {
    onChange({ ...query, sourceType: value });
  };

  const onMetricTypeChange = (value: any) => {
    onChange({ ...query, metricType: value });
  };

  const onChangeMetricData = (value: any) => {
    onChange({ ...query, metricData: value });
  };

  const onChangeLogData = (value: any) => {
    onChange({ ...query, logData: value });
  };

  const onChangeTraceData = (value: any) => {
    onChange({ ...query, traceData: value });
  };

  const onChangeAPIData = (value: any) => {
    onChange({ ...query, apiData: value });
  };

  const onEditorModeChange = (newMetricEditorMode: any) => {
    onChange({ ...query, metricEditorMode: newMetricEditorMode });
  };

  const {
    sourceType,
    metricType,
    metricData,
    metricEditorMode,
    logData,
    traceData,
    apiData
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
              query={metricData ? metricData : {}}
              onChange={onChangeMetricData}
              editorMode={defaultMetricMode}
              apiData={fetchedData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.LOG ?
            <Log
              query={logData ? logData : {}}
              onChange={onChangeLogData}
              apiData={fetchedData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.TRACE ?
            <Trace
              query={traceData ? traceData : {}}
              onChange={onChangeTraceData}
              apiData={fetchedData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.API ?
            <Api
              query={apiData ? apiData : {}}
              onChange={onChangeAPIData}
              apiData={fetchedData}
            />
            :
            <></>
        }
      </div>
    </div>
  );
}
