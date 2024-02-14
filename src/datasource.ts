import { DataSourceInstanceSettings, CoreApp, DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { Services } from './service';
import { MyQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';
import {
  getCloudElementsQuery
} from './common-ds';
import { Observable, from, mergeMap } from 'rxjs';

export class DataSource extends DataSourceWithBackend<MyQuery, MyDataSourceOptions> {
  service;
  awsxUrl;
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.service = new Services(instanceSettings.jsonData.cmdbEndpoint || "", instanceSettings.jsonData.grafanaEndpoint || "");
    instanceSettings.meta.jsonData = JSON.parse(JSON.stringify(instanceSettings.jsonData));
    this.awsxUrl = instanceSettings.jsonData.awsxEndPoint || "";
  }

  getCloudElements(id: string) {
    return from(this.service.getCloudElements(id).then(res => {
      let cloudElementQuery = {};
      if (res && res[0]) {
        const cloudElement = res[0];
        if (cloudElement) {
          cloudElementQuery = getCloudElementsQuery(id, cloudElement, this.awsxUrl);
        }
      }
      return cloudElementQuery;
    }));
  };

  getDefaultQuery(_: CoreApp): Partial<MyQuery> {
    return DEFAULT_QUERY
  }

  query(request: DataQueryRequest<MyQuery>): Observable<DataQueryResponse> {
    let id = "";
    if (document.getElementById("elementId")) {
      id = (document.getElementById("elementId") as HTMLInputElement)?.value;
    }
    if (id) {
      return this.getCloudElements(id).pipe(
        mergeMap((query: object) => {
          let targets = request.targets;
          for (let i = 0; i < targets.length; i++) {
            targets[i] = {
              ...targets[i],
              ...query
            }
          }
          return super.query(request);
        }));
    } else {
      return super.query(request);
    }
  }
}
