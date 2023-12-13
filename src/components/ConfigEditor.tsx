import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> { }

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;

  const onGrafanaEndPoint = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      grafanaEndpoint: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  const onAPIEndPointChange = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      cmdbEndpoint: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to the backend)
  // const onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   onOptionsChange({
  //     ...options,
  //     secureJsonData: {
  //       apiKey: event.target.value,
  //     },
  //   });
  // };

  // const onResetAPIKey = () => {
  //   onOptionsChange({
  //     ...options,
  //     secureJsonFields: {
  //       ...options.secureJsonFields,
  //       apiKey: false,
  //     },
  //     secureJsonData: {
  //       ...options.secureJsonData,
  //       apiKey: '',
  //     },
  //   });
  // };

  const { jsonData } = options;
  // const { jsonData, secureJsonFields } = options;
  // const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

  return (
    <div className="gf-form-group">
      <InlineField label="Grafana Endpoint" labelWidth={24}>
        <Input
          onChange={onGrafanaEndPoint}
          value={jsonData.grafanaEndpoint || ''}
          placeholder="http://localhost:3001"
          width={40}
        />
      </InlineField>
      {/* <InlineField label="API Key" labelWidth={12}>
        <SecretInput
          isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
          value={secureJsonData.apiKey || ''}
          placeholder="Test"
          width={40}
          onReset={onResetAPIKey}
          onChange={onAPIKeyChange}
        />
      </InlineField> */}
      <InlineField label="CMDB API Endpoint" labelWidth={24}>
        <Input
          onChange={onAPIEndPointChange}
          value={jsonData.cmdbEndpoint || ''}
          placeholder="https://api.synectiks.net/cmdb"
          width={40}
        />
      </InlineField>
    </div>
  );
}
