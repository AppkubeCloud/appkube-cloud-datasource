import React, { useEffect, useRef, useState, useCallback } from 'react';
import { InlineField, Select, Input } from '@grafana/ui';
import {
  RESPONSE_TYPE
} from '../common-ds';
import { EditorRow, EditorRows } from '../extended/EditorRow';
import { Services } from '../service';

export function QueryEditor({ query, onChange, onRunQuery, datasource }: any) {
  const service = new Services(datasource.meta.jsonData.cmdbEndpoint || "", datasource.meta.jsonData.grafanaEndpoint || "");
  const [elementId, setElementId] = useState("");
  const [supportedPanels, setSupportedPanels] = useState([]);
  const onChanged = useRef(false);

  const getCloudElements = useCallback((id: string, query: any) => {
    service.getCloudElements(id).then((res) => {
      if (res && res[0]) {
        const cloudElement = res[0];
        query = {
          ...query,
          "elementType": cloudElement.elementType,
          "elementId": parseInt(id, 10),
          "cloudIdentifierName": cloudElement.instanceName,
          "cloudIdentifierId": cloudElement.instanceId,
          "type": "appkube-metrics",
          "queryMode": "Metrics",
          "source": "url",
          "productId": 1,
          "environmentId": parseInt(id, 10),
          "moduleId": 2,
          "serviceId": 2,
          "serviceType": "java app service",
          "cmdbUrl": "",
          "vaultUrl": "",
          "namespace": cloudElement.elementType,
          "matchExact": true,
          "expression": "",
          "id": "",
          "alias": "",
          "period": "",
          "metricQueryType": 0,
          "metricEditorMode": 0,
          "sqlExpression": "",
          "accountId": "657907747545",
          "region": ""
        };
        onChange({ ...query });
        service.getSupportedPanels(res[0].elementType).then((res) => {
          setSupportedPanels(res);
        });
      }
    });
  }, [onChange]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onChanged.current === false) {
      const id = findParam("var-elementId", window.location.href);
      if (id) {
        setElementId(id);
        getCloudElements(id, query);
      } else {
        alert("Please set 'elementId' variable");
      }
      onChanged.current = true;
    }
  }, [query, onChange, getCloudElements]);

  const findParam = (paramName: string, url: string) => {
    if (!url) {
      url = location.href;
    }
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    const regexS = "[\\?&]" + paramName + "=([^&#]*)";
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? "" : results[1];
  }

  const onChangeElementType = (e: any) => {
    onChange({ ...query, elementType: e.target.value });
  };

  const onChangeInstanceID = (e: any) => {
    onChange({ ...query, cloudIdentifierId: e.target.value });
  };

  const onChangeSupportedPanel = (value: any) => {
    onChange({ ...query, supportedPanel: value });
  };

  const onChangeResponseType = (value: any) => {
    onChange({ ...query, supportedPanel: value });
  };

  const {
    elementType,
    cloudIdentifierId,
    supportedPanel,
    responseType
  } = query;

  return (
    <div>
      <EditorRows>
        <EditorRow label="">
          <InlineField label="Element Type">
            <Input value={elementType} onChange={(e: any) => onChangeElementType(e)} />
          </InlineField>
          <InlineField label="Instance ID">
            <Input value={cloudIdentifierId} onChange={(e: any) => onChangeInstanceID(e)} />
          </InlineField>
          <InlineField label="Element ID">
            <Input disabled={true} value={elementId} />
          </InlineField>
        </EditorRow>
      </EditorRows>
      <EditorRows>
        <EditorRow label="">
          <InlineField label="Supported Panels">
            <Select
              className="min-width-12 width-12"
              value={supportedPanel}
              options={supportedPanels}
              onChange={(e) => onChangeSupportedPanel(e.value)}
              menuShouldPortal={true}
            />
          </InlineField>
          <InlineField label="Response Type">
            <Select
              className="min-width-12 width-12"
              value={responseType}
              options={RESPONSE_TYPE}
              onChange={(e) => onChangeResponseType(e.value)}
              menuShouldPortal={true}
            />
          </InlineField>
        </EditorRow>
      </EditorRows>
    </div>
  );
}
