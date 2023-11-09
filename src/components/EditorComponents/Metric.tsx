import React from 'react';
import { Select, InlineField, Input } from '@grafana/ui';
import { EditorRow, EditorRows } from '../../extended/EditorRow';
import { STASTISTIC, MetricEditorMode } from '../../common-ds';

export function Metric({ query, onChange, editorMode, metricsList }: any) {
  const { elementType, cloudIdentifierId, metricName, statistic, metricQuery } = query;

  const onChangeElementType = (e: any) => {
    onChange({ ...query, elementType: e.target.value });
  };

  const onChangeInstanceID = (e: any) => {
    onChange({ ...query, cloudIdentifierId: e.target.value });
  };

  const onChangeMetricQuery = (e: any) => {
    onChange({ ...query, metricQuery: e.target.value });
  };

  const onChangeMetricName = (value: any) => {
    onChange({ ...query, metricName: value });
  };

  const onChangeStatistic = (value: any) => {
    onChange({ ...query, statistic: value });
  };


  return (
    <EditorRows>
      <EditorRow label="">
        <InlineField label="Element Type">
          <Input value={elementType} onChange={(e: any) => onChangeElementType(e)} />
        </InlineField>
        <InlineField label="Instance ID">
          <Input value={cloudIdentifierId} onChange={(e: any) => onChangeInstanceID(e)} />
        </InlineField>
      </EditorRow>
      {
        editorMode === MetricEditorMode.Builder ?
          <EditorRow label="">
            <InlineField label="Metric Name">
              <Select
                className="min-width-12 width-12"
                value={metricName}
                options={metricsList}
                onChange={(e) => onChangeMetricName(e.value)}
                menuShouldPortal={true}
              />
            </InlineField>
            <InlineField label="Statistic">
              <Select className="min-width-12 width-12" value={statistic} options={STASTISTIC} onChange={(e) => onChangeStatistic(e.value)} menuShouldPortal={true} />
            </InlineField>
          </EditorRow> :
          <EditorRow label="">
            <Input placeholder='Enter your query' value={metricQuery} onChange={(e: any) => onChangeMetricQuery(e)} />
          </EditorRow>
      }
    </EditorRows>
  );
}
