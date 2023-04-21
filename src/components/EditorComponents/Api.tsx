import React, { useRef } from 'react';
import { Select, InlineField, Input, Button, Checkbox } from '@grafana/ui';
import { EditorRow, EditorRows } from '../../extended/EditorRow';
import { EditorField } from '../../extended/EditorField';
// import { DUMMY_PRODUCTS, DUMMY_ENVS, DUMMY_MODULES, DUMMY_SERVICES } from '../../common-ds';


export function Api({ query, onChange, apiData }: any) {
  const { productId, environmentId, moduleId, serviceId, elementType, instanceID, method, columns, isObjectInsteadOfArray, isDataInColumn, rowsRoots } = query;

  const [allColumns, setAllColumns] = React.useState<any>([]);
  const fetchingComplete = useRef(false);

  React.useEffect(() => {
    if (fetchingComplete.current === false) {
      setAllColumns(columns ? columns : [{
        selector: "",
        as: "",
        formatAs: "",
      }]);
    }
    fetchingComplete.current = true;
  }, [columns]);

  const onChangeProduct = (e: any) => {
    onChange({ ...query, productId: e.id });
  };

  const onChangeEnv = (e: any) => {
    onChange({ ...query, environmentId: e.id });
  };

  const onChangeModule = (e: any) => {
    onChange({ ...query, moduleId: e.id });
  };

  const onChangeService = (e: any) => {
    onChange({ ...query, serviceId: e.id });
  };

  const onChangeElementType = (e: any) => {
    onChange({ ...query, elementType: e.target.value });
  };

  const onChangeInstanceID = (e: any) => {
    onChange({ ...query, instanceID: e.target.value });
  };

  const onChangeMethod = (e: any) => {
    onChange({ ...query, method: e.target.value });
  };

  const onChangeColumn = (index: any, columnsList: any, key: any, value: any) => {
    columnsList[index][key] = value;
    onChange({ ...query, columns: JSON.parse(JSON.stringify(columnsList)) });
  };

  const onClickAddColumn = () => {
    allColumns.push({
      selector: "",
      as: "",
      formatAs: "",
    });
    setAllColumns(JSON.parse(JSON.stringify(allColumns)));
  };

  const onClickRemove = (columns: any, index: any) => {
    columns.splice(index, 1);
    setAllColumns(JSON.parse(JSON.stringify(columns)));
  };

  const renderColumns = (columns: any) => {
    const retData: any = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      retData.push(
        <EditorRow label="" key={`column-${i}`}>
          <InlineField label="Selector">
            <Input value={column.selector} onChange={(e: any) => onChangeColumn(i, columns, "selector", e.target.value)} />
          </InlineField>
          <InlineField label="as">
            <Input value={column.as} onChange={(e: any) => onChangeColumn(i, columns, "as", e.target.value)} />
          </InlineField>
          <InlineField label="Format as">
            <Input value={column.formatAs} onChange={(e: any) => onChangeColumn(i, columns, "formatAs", e.target.value)} />
          </InlineField>
          {
            columns.length > 1 ?
              <Button onClick={() => onClickRemove(columns, i)} icon='times'></Button> : <></>
          }
        </EditorRow>
      );
    }
    return retData;
  };

  const onChangeObjectArray = (e: any) => {
    onChange({ ...query, isObjectInsteadOfArray: e.target.checked });
  };

  const onChangeDataInColumn = (e: any) => {
    onChange({ ...query, isDataInColumn: e.target.checked });
  };

  const onChangeRowsRoots = (e: any) => {
    onChange({ ...query, rowsRoots: e.target.value });
  };

  const getAllProducts = () => {
    let prodArray: any[] = [];
    apiData.map((item: any) => {
      prodArray.push({ "id": item.id, "label": item.name, "value": item.id });
    })
    return prodArray;
  }

  const getAllEnvironments = () => {
    let envData: any[] = [];
    let envList: any[] = [];
    apiData.map((item: any) => {
      if (item.id === productId) {
        envData = item.deploymentEnvironments;
      }
    })
    envData.map((item: any) => {
      envList.push({ "id": item.id, "label": item.name, "value": item.id });
    })
    return envList;
  }

  const getAllModules = () => {
    let moduleData: any[] = [];
    let envData: any[] = [];
    let moduleList: any[] = [];
    apiData.map((item: any) => {
      if (item.id === productId) {
        envData = item.deploymentEnvironments;
      }
    })
    envData.map((item: any) => {
      moduleData = item.modules;
    })
    moduleData.map((item: any) => {
      moduleList.push({ "id": item.id, "label": item.name, "value": item.id });
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
      if (item.id === productId) {
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
      servicesList.push({ "id": item.id, "label": item.name, "value": item.id });
    })
    dataServices.map((item) => {
      servicesList.push({ "id": item.id, "label": item.name, "value": item.id });
    })

    return servicesList;
  }

  return (
    <EditorRows>
      <EditorRow label="">
        <EditorField label='Product'>
          <Select
            className="min-width-12 width-12"
            value={productId}
            options={(apiData.length ? getAllProducts() : undefined)}
            onChange={(e) => onChangeProduct(e)}
            menuShouldPortal={true}
          />
        </EditorField>
        <EditorField label='Environment'>
          <Select
            className="min-width-12 width-12"
            value={environmentId}
            options={(apiData.length ? getAllEnvironments() : undefined)}
            onChange={(e) => onChangeEnv(e)}
            menuShouldPortal={true}
          />
        </EditorField>
        <EditorField label='Module'>
          <Select
            className="min-width-12 width-12"
            value={moduleId}
            options={(apiData.length ? getAllModules() : undefined)}
            onChange={(e) => onChangeModule(e)}
            menuShouldPortal={true}
          />
        </EditorField>
        <EditorField label='App/Data Service'>
          <Select
            className="min-width-12 width-12"
            value={serviceId}
            options={(apiData.length ? getAllServices() : undefined)}
            onChange={(e) => onChangeService(e)}
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
        <InlineField label="Method">
          <Input value={method} onChange={(e: any) => onChangeMethod(e)} />
        </InlineField>
      </EditorRow>
      <EditorRow label="">
        <h5><b>Parsing Option and Result Field</b></h5>
      </EditorRow>
      <EditorRow label="">
        <EditorField label='Rows/Root - Optional'>
          <textarea value={rowsRoots} onChange={onChangeRowsRoots} placeholder='Rows/Root Selector'></textarea>
        </EditorField>
      </EditorRow>
      <EditorRow label="">
        <label>Rows/Root - Optional</label>
      </EditorRow>
      {renderColumns(allColumns)}
      <EditorRow label="Column - Optional">
        <Button onClick={onClickAddColumn} icon='plus-square'>Column</Button>
      </EditorRow>
      <EditorRow label="">
        <label >Advance Options - Optional</label>
      </EditorRow>
      <EditorRow label="">
        <Checkbox value={isObjectInsteadOfArray} label='Root returns object instead of array?' onChange={onChangeObjectArray} />
      </EditorRow>
      <EditorRow label="">
        <Checkbox value={isDataInColumn} label='Is data in column format?' onChange={onChangeDataInColumn} />
      </EditorRow>
    </EditorRows>
  );
}
