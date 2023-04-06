import React from 'react';
import { InlineField, Select, HorizontalGroup, RadioButtonGroup } from '@grafana/ui';
// import { QueryEditorProps } from '@grafana/data';
// import { DataSource } from '../datasource';
// import { MyDataSourceOptions, MyQuery } from '../types';
import { SOURCE_TYPE, SOURCE_VALUE, METRIC_TYPE, METRIC_EDITOR_MODES, MetricEditorMode } from '../common-ds';
import { Metric } from './EditorComponents/Metric';


export function QueryEditor({ query, onChange, onRunQuery }: any) {

  const onSourceTypeChange = (value: any) => {
    onChange({ ...query, sourceType: value });
  };

  const onMetricTypeChange = (value: any) => {
    onChange({ ...query, metricType: value });
  };

  const onChangeMetricData = (value: any) => {
    onChange({ ...query, metricData: value });
  };

  const onEditorModeChange = (newMetricEditorMode: any) => {
    onChange({ ...query, metricEditorMode: newMetricEditorMode });
  };
  const { sourceType, metricType, metricData, metricEditorMode } = query;
  const defaultMetricMode = metricEditorMode ? metricEditorMode : MetricEditorMode.Builder;
  return (
    <div>
      <div style={{display: "flex", alignItems: "center"}}>
        <InlineField label="Source Type">
          <Select className="min-width-12 width-12" value={sourceType} options={SOURCE_TYPE} onChange={(e) => onSourceTypeChange(e.value)} menuShouldPortal={true} />
        </InlineField>
        {
          sourceType === SOURCE_VALUE.METRIC ?
            <>
              <InlineField label="Source Type">
                <Select className="min-width-12 width-12" value={metricType} options={METRIC_TYPE} onChange={(e) => onMetricTypeChange(e.value)} menuShouldPortal={true} />
              </InlineField>
              <div style={{ display: "block", flexGrow: "1" }} />
              <RadioButtonGroup options={METRIC_EDITOR_MODES} size="sm" value={defaultMetricMode} onChange={onEditorModeChange} />
            </>
            : <></>
        }
      </div>
      <div>
        {
          sourceType === SOURCE_VALUE.METRIC ?
            <Metric query={metricData ? metricData : {}} onChange={onChangeMetricData} editorMode={defaultMetricMode} /> : <></>
        }
      </div>
    </div>
  );
}
