import React, { useEffect, useRef, useState, useCallback } from 'react';
import { InlineField, Select, Input } from '@grafana/ui';
import {
  SOURCE_TYPE,
  SOURCE_VALUE,
  METRIC_TYPE,
  MetricEditorMode
} from '../common-ds';
import { Metric } from './EditorComponents/Metric';
import { Log } from './EditorComponents/Log';
import { Trace } from './EditorComponents/Trace';
import { Api } from './EditorComponents/Api';
import { Services } from '../service';

export function QueryEditor({ query, onChange, onRunQuery, datasource }: any) {
  const service = new Services(datasource.meta.jsonData.cmdbEndpoint || "", datasource.meta.jsonData.grafanaEndpoint || "");
  const [elementId, setElementId] = useState("");
  const [metricsList, setMetricsList] = useState([]);
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
        service.getMetricsList(res[0].elementType).then((res) => {
          setMetricsList(res);
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

  const onSourceTypeChange = (value: any) => {
    if (value === SOURCE_VALUE.METRIC) {
      query.queryType = 'timeSeriesQuery';
    } else if (value === SOURCE_VALUE.LOG) {
      query.queryType = 'logAction';
    }
    query.sourceType = value;
    if (!elementId) {
      const id = findParam("var-elementId", window.location.href);
      if (id) {
        setElementId(id);
        getCloudElements(id, query);
      } else {
        alert("Please set 'elementId' variable");
      }
    } else {
      getCloudElements(elementId, query);
    }
  };

  const onMetricTypeChange = (value: any) => {
    onChange({ ...query, metricType: value });
  };

  const onChangeData = (value: any) => {
    onChange({ ...query, ...value });
  };

  const {
    sourceType,
    metricType,
    metricEditorMode,
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
              <InlineField label="Element ID">
                <Input disabled={true} value={elementId} />
              </InlineField>
              <div style={{ display: "block", flexGrow: "1" }} />
            </>
            :
            <></>
        }
      </div>
      <div>
        {
          sourceType === SOURCE_VALUE.METRIC ?
            <Metric
              query={query}
              onChange={onChangeData}
              editorMode={defaultMetricMode}
              metricsList={metricsList}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.LOG ?
            <Log
              query={query}
              onChange={onChangeData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.TRACE ?
            <Trace
              query={query}
              onChange={onChangeData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.API ?
            <Api
              query={query}
              onChange={onChangeData}
            />
            :
            <></>
        }
      </div>
    </div>
  );
}
