import React from 'react';
import { Select, InlineField, Input } from '@grafana/ui';
import { EditorRow, EditorRows } from '../../extended/EditorRow';
import { EditorField } from '../../extended/EditorField';
import { DUMMY_METRIC_NAME, DUMMY_STASTISTIC, MetricEditorMode } from '../../common-ds';

export function Metric({ query, onChange, editorMode, apiData }: any) {
  const { product, env, module, service, elementType, instanceID, metricName, statistic, metricQuery } = query;

  const onChangeProduct = (value: any) => {
    onChange({ ...query, product: value });
  };

  const onChangeEnv = (value: any) => {
    onChange({ ...query, env: value });
  };

  const onChangeModule = (value: any) => {
    onChange({ ...query, module: value });
  };

  const onChangeService = (value: any) => {
    onChange({ ...query, service: value });
  };

  const onChangeElementType = (e: any) => {
    onChange({ ...query, elementType: e.target.value });
  };

  const onChangeInstanceID = (e: any) => {
    onChange({ ...query, instanceID: e.target.value });
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

  const getAllProducts = () => {
    let prodArray: any[] = [];
    apiData.map((item: any) => {
      prodArray.push({ "label": item.name, "value": item.name });
    })
    return prodArray;
  }

  const getAllEnvironments = () => {
    let envData: any[] = [];
    let envList: any[] = [];
    apiData.map((item: any) => {
      if (item.name === product) {
        envData = item.deploymentEnvironments;
      }
    })
    envData.map((item: any) => {
      envList.push({ "label": item.name, "value": item.name });
    })
    return envList;
  }

  const getAllModules = () => {
    let moduleData: any[] = [];
    let envData: any[] = [];
    let moduleList: any[] = [];
    apiData.map((item: any) => {
      if (item.name === product) {
        envData = item.deploymentEnvironments;
      }
    })
    envData.map((item: any) => {
      moduleData = item.modules;
    })
    moduleData.map((item: any) => {
      moduleList.push({ "label": item.name, "value": item.name });
    })
    return moduleList;
  }

  const getAllServices = () => {
    let moduleData: any[] = [];
    let envData: any[] = [];
    let appServices: any[] = [];
    let dataServices: any[] = [];
    let servicesList: any[] = [];
    apiData.map((item: any) => {
      if (item.name === product) {
        envData = item.deploymentEnvironments;
      }
    })
    envData.map((item: any) => {
      moduleData = item.modules;
    })
    moduleData.map((item: any) => {
      appServices = item.appServices;
      dataServices = item.dataServices;
    })
    appServices.map((item) => {
      servicesList.push({ "label": item.name, "value": item.name });
    })
    dataServices.map((item) => {
      servicesList.push({ "label": item.name, "value": item.name });
    })

    return servicesList;
  }

  return (
    <EditorRows>
      <EditorRow label="">
        <EditorField label='Product'>
          <Select
            className="min-width-12 width-12"
            value={product}
            options={(apiData.length ? getAllProducts() : undefined)}
            onChange={(e) => onChangeProduct(e.value)}
            menuShouldPortal={true}
          />
        </EditorField>
        <EditorField label='Environment'>
          <Select
            className="min-width-12 width-12"
            value={env}
            options={(apiData.length ? getAllEnvironments() : undefined)}
            onChange={(e) => onChangeEnv(e.value)}
            menuShouldPortal={true}
          />
        </EditorField>
        <EditorField label='Module'>
          <Select
            className="min-width-12 width-12"
            value={module}
            options={(apiData.length ? getAllModules() : undefined)}
            onChange={(e) => onChangeModule(e.value)}
            menuShouldPortal={true}
          />
        </EditorField>
        <EditorField label='App/Data Service'>
          <Select
            className="min-width-12 width-12"
            value={service}
            options={(apiData.length ? getAllServices() : undefined)}
            onChange={(e) => onChangeService(e.value)}
            menuShouldPortal={true}
          />
        </EditorField>
      </EditorRow>
      <EditorRow label="">
        <InlineField label="Element Type">
          <Input value={elementType} onChange={(e: any) => onChangeElementType(e)} />
        </InlineField>
        <InlineField label="Instance ID">
          <Input value={instanceID} onChange={(e: any) => onChangeInstanceID(e)} />
        </InlineField>
      </EditorRow>
      {
        editorMode === MetricEditorMode.Builder ?
          <EditorRow label="">
            <InlineField label="Metric Name">
              <Select className="min-width-12 width-12" value={metricName} options={DUMMY_METRIC_NAME} onChange={(e) => onChangeMetricName(e.value)} menuShouldPortal={true} />
            </InlineField>
            <InlineField label="Statistic">
              <Select className="min-width-12 width-12" value={statistic} options={DUMMY_STASTISTIC} onChange={(e) => onChangeStatistic(e.value)} menuShouldPortal={true} />
            </InlineField>
          </EditorRow> :
          <EditorRow label="">
            <Input placeholder='Enter your query' value={metricQuery} onChange={(e: any) => onChangeMetricQuery(e)} />
          </EditorRow>
      }
    </EditorRows>
  );
}
