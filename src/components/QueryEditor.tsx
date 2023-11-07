import React, { useEffect, useRef, useState } from 'react';
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
import { services } from '../service';

export function QueryEditor({ query, onChange, onRunQuery }: any) {
  const [elementId, setElementId] = useState("");
  const onChanged = useRef(false);

  useEffect(() => {
    const id = findParam("var-elementId", window.location.href);
    if (id) {
      setElementId(id);
      getCloudElements(id, query);
    } else {
      alert("Please set 'elementId' variable");
    }
  }, []);

  useEffect(() => {
    if (onChanged.current === false) {
      if (!query.JSON) {
        query.JSON = {
          type: "appkube-cloudwatch",
          queryType: "timeSeriesQuery",
          source: "url",
          productId: null,
          environmentId: null,
          moduleId: null,
          serviceId: null,
          serviceType: "java app service",
          cmdbUrl: "http://34.199.12.114:6067/api/service-allocations/search",
          vaultUrl: "http://34.199.12.114:6067/api/vault/accountId",
          namespace: "AWS/EC2",
          metricName: "CPUUtilization",
          matchExact: true,
          statistic: "Average",
          "elementType": "",
          "elementId": "",
          "cloudIdentifierName": "i-09ccf4e2e087fa88f",
          "cloudIdentifierId": "i-09ccf4e2e087fa88f"
        };
        onChange(query);
        onChanged.current = true;
      }
    }
  }, [query, onChange]);

  const getCloudElements = (id: string, query: any) => {
    services.getCloudElements(id).then((res) => {
      if (res && res[0]) {
        const cloudElement = res[0];
        query.JSON = {
          ...query.JSON,
          "elementType": cloudElement.elementType,
          "elementId": id,
          "cloudIdentifierName": cloudElement.instanceName,
          "cloudIdentifierId": cloudElement.instanceId
        };
        onChange({ ...query });
      }
    });
  };

  const findParam = (paramName: string, url: string) => {
    if (!url) url = location.href;
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? "" : results[1];
  }

  const onSourceTypeChange = (value: any) => {
    if (value === SOURCE_VALUE.METRIC) {
      query.JSON.queryType = 'timeSeriesQuery';
    } else if (value === SOURCE_VALUE.LOG) {
      query.JSON.queryType = 'logAction';
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
              query={JSON ? JSON : {}}
              onChange={onChangeData}
              editorMode={defaultMetricMode}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.LOG ?
            <Log
              query={JSON ? JSON : {}}
              onChange={onChangeData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.TRACE ?
            <Trace
              query={JSON ? JSON : {}}
              onChange={onChangeData}
            />
            :
            <></>
        }
        {
          sourceType === SOURCE_VALUE.API ?
            <Api
              query={JSON ? JSON : {}}
              onChange={onChangeData}
            />
            :
            <></>
        }
      </div>
    </div>
  );
}
