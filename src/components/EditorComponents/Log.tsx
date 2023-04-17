import React from 'react';
import { Select, InlineField, Input } from '@grafana/ui';
import { EditorRow, EditorRows } from '../../extended/EditorRow';
import { EditorField } from '../../extended/EditorField';
// import { DUMMY_PRODUCTS, DUMMY_ENVS, DUMMY_MODULES, DUMMY_SERVICES } from '../../common-ds';


export function Log({ query, onChange, apiData }: any) {
  const { product, env, module, service, elementType, instanceID, logQuery, logGroup } = query;

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

  const onChangeLogGroup = (e: any) => {
    onChange({ ...query, logGroup: e.target.value });
  };

  const onChangeLogQuery = (e: any) => {
    onChange({ ...query, logQuery: e.target.value });
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
            menuShouldPortal={true} />
        </EditorField>
      </EditorRow>
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
