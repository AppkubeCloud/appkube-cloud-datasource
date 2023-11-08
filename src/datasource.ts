import { DataSourceInstanceSettings, CoreApp, DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { services } from './service';
import { MyQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';
import { Observable, from, mergeMap } from 'rxjs';

export class DataSource extends DataSourceWithBackend<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }

  findParam(paramName: string, url: string) {
    if (!url) {
      url = location.href;
    }
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    const regexS = "[\\?&]" + paramName + "=([^&#]*)";
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? "" : results[1];
  }

  getCloudElements(id: string) {
    return from(services.getCloudElements(id).then(res => {
      let query = {};
      if (res && res[0]) {
        const cloudElement = res[0];
        query = {
          "elementType": cloudElement.elementType,
          "elementId": parseInt(id, 10),
          "cloudIdentifierName": cloudElement.instanceName,
          "cloudIdentifierId": cloudElement.instanceId,
          "environmentId": parseInt(id, 10),
        };
      }
      return query;
    }));
  };

  getDefaultQuery(_: CoreApp): Partial<MyQuery> {
    return DEFAULT_QUERY
  }

  query(request: DataQueryRequest<MyQuery>): Observable<DataQueryResponse> {
    const id = this.findParam("var-elementId", window.location.href);
    if (id) {
      // return this.getCloudElements(id).pipe(query => {
      //   let targets = request.targets;
      //   for (let i = 0; i < targets.length; i++) {
      //     targets[i] = {
      //       ...targets[i],
      //       ...query
      //     }
      //   }
      //   return super.query(request);
      // });
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
