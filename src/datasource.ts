import { DataSourceInstanceSettings, CoreApp, DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';

import { MyQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';
import { Observable } from 'rxjs';

export class DataSource extends DataSourceWithBackend<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }

  getDefaultQuery(_: CoreApp): Partial<MyQuery> {
    return DEFAULT_QUERY
  }

  query(request: DataQueryRequest<MyQuery>): Observable<DataQueryResponse> {
    return super.query(request);
  }
}
