import React from 'react';
import { InlineField, Input } from '@grafana/ui';
import { EditorRow, EditorRows } from '../../extended/EditorRow';
// import { DUMMY_PRODUCTS, DUMMY_ENVS, DUMMY_MODULES, DUMMY_SERVICES } from '../../common-ds';


export function Log({ query, onChange }: any) {
  const { elementType, instanceID, logQuery, logGroup } = query;

  const onChangeElementType = (e: any) => {
    onChange({ ...query, elementType: e.target.value });
  };

  const onChangeInstanceID = (e: any) => {
    onChange({ ...query, instanceID: e.target.value });
  };

  const onChangeLogGroup = (e: any) => {
    onChange({ ...query, logGroup: e.target.value });
  };

  const onChangeLogQuery = (e: any) => {
    onChange({ ...query, logQuery: e.target.value });
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
        <InlineField label="Log Group">
          <Input value={logGroup} onChange={(e: any) => onChangeLogGroup(e)} />
        </InlineField>
      </EditorRow>
      <EditorRow label="">
        <Input placeholder='Enter your log query' value={logQuery} onChange={(e: any) => onChangeLogQuery(e)} />
      </EditorRow>
    </EditorRows>
  );
}
