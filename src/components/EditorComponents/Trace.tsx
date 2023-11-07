import React from 'react';
import { InlineField, Input } from '@grafana/ui';
import { EditorRow, EditorRows } from '../../extended/EditorRow';

export function Trace({ query, onChange }: any) {
  const { elementType, instanceID, traceQuery, traceLocation } = query;

  const onChangeElementType = (e: any) => {
    onChange({ ...query, elementType: e.target.value });
  };

  const onChangeInstanceID = (e: any) => {
    onChange({ ...query, instanceID: e.target.value });
  };

  const onChangeTraceLocation = (e: any) => {
    onChange({ ...query, traceLocation: e.target.value });
  };

  const onChangeTraceQuery = (e: any) => {
    onChange({ ...query, traceQuery: e.target.value });
  };

  return (
    <EditorRows>
      <EditorRow label="">
        <InlineField label="Element Type">
          <Input value={elementType} onChange={(e: any) => onChangeElementType(e)} />
        </InlineField>
        <InlineField label="Instance ID">
          <Input value={instanceID} onChange={(e: any) => onChangeInstanceID(e)} />
        </InlineField>
        <InlineField label="Trace Location">
          <Input value={traceLocation} onChange={(e: any) => onChangeTraceLocation(e)} />
        </InlineField>
      </EditorRow>
      <EditorRow label="">
        <Input placeholder='Enter your trace query' value={traceQuery} onChange={(e: any) => onChangeTraceQuery(e)} />
      </EditorRow>
    </EditorRows>
  );
}
