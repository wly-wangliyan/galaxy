import {Injectable} from '@angular/core';
import {RequestOptionsArgs, URLSearchParams, Http, Headers, Response} from '@angular/http';
import {isNullOrUndefined} from 'util';
import {ZCoreBase} from '../../utils/z-core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {

  private _timeStamp = new Date().getTime() / 1000;

  constructor(private http: Http) {
    Observable.interval(1000).subscribe(() => {
      this._timeStamp += 1;
    });
  }

  /**
   * 获取当前的服务器时间戳(秒)
   */
  public get timeStamp(): number {
    return this._timeStamp;
  }

  /**
   * 设置首次的服务器时间戳(只能调用一次)
   * @param timeStamp
   */
  public setStartTimeStamp(timeStamp: number) {
    if (!isNullOrUndefined(timeStamp)) {
      this._timeStamp = timeStamp;
    }
  }

  private generateDefaultOptions(): RequestOptionsArgs {
    const requestOptions: RequestOptionsArgs = {};
    const headers = new Headers();
    headers.set('Accept', 'application/JSON');
    headers.set('Content-Type', 'application/JSON;charset=UTF-8');
    requestOptions.headers = headers;
    requestOptions.params = new URLSearchParams();
    requestOptions.withCredentials = true;
    return requestOptions;
  }

  private generateFormOptions(): RequestOptionsArgs {
    const requestOptions: RequestOptionsArgs = {};
    const headers = new Headers();
    headers.set('Accept', 'application/JSON');
    headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    requestOptions.headers = headers;
    requestOptions.params = new URLSearchParams();
    requestOptions.withCredentials = true;
    return requestOptions;
  }

  private updateOptions(options: RequestOptionsArgs, params?: any, headers?: any, body?: any) {
    if (headers) {
      for (const key in headers) {
        if (!headers.hasOwnProperty(key)) {
          continue;
        }
        options.headers.set(key, headers[key]);
      }
    }
    if (params) {
      options.params = params;
    }
    if (body) {
      options.body = JSON.stringify(body);
    }
  }

  public get(url, params?: any, headers?: any): Observable<Response> {
    const options = this.generateFormOptions();
    this.updateOptions(options, params, headers);
    return this.http.get(url, options).map(data => {
      this._timeStamp = data.headers.get('date') ? new Date(data.headers.get('date')).getTime() / 1000 : this._timeStamp;
      return data;
    });
  }

  public post(url, body?: any, headers?: any, params?: any): Observable<Response> {
    const options = this.generateDefaultOptions();
    this.updateOptions(options, params, headers);
    return this.http.post(url, body ? JSON.stringify(body) : null, options).map(data => {
      this._timeStamp = data.headers.get('date') ? new Date(data.headers.get('date')).getTime() / 1000 : this._timeStamp;
      return data;
    });
  }

  public postFormData(url, body?: any, headers?: any, params?: any): Observable<Response> {
    const options = this.generateFormOptions();
    this.updateOptions(options, params, headers);

    let tempBody = '';
    Object.getOwnPropertyNames(body).forEach(property => {
      if (body[property]) {
        tempBody += `${property}=` + encodeURIComponent(body[property]) + '&';
      }
    });
    tempBody = tempBody.length > 0 ? tempBody.slice(0, tempBody.length - 1) : tempBody;
    return this.http.post(url, tempBody, options).map(data => {
      this._timeStamp = data.headers.get('date') ? new Date(data.headers.get('date')).getTime() / 1000 : this._timeStamp;
      return data;
    });
  }

  public put(url, body?: any, headers?: any, params?: any): Observable<Response> {
    const options = this.generateDefaultOptions();
    this.updateOptions(options, params, headers);
    return this.http.put(url, body ? JSON.stringify(body) : null, options).map(data => {
      this._timeStamp = data.headers.get('date') ? new Date(data.headers.get('date')).getTime() / 1000 : this._timeStamp;
      return data;
    });
  }

  public patch(url, body?: any, headers?: any, params?: any): Observable<Response> {
    const options = this.generateDefaultOptions();
    this.updateOptions(options, params, headers);
    return this.http.patch(url, body ? JSON.stringify(body) : null, options).map(data => {
      this._timeStamp = data.headers.get('date') ? new Date(data.headers.get('date')).getTime() / 1000 : this._timeStamp;
      return data;
    });
  }

  public delete(url, body?: any, headers?: any): Observable<Response> {
    const options = this.generateDefaultOptions();
    this.updateOptions(options, null, headers, body);
    return this.http.delete(url, options).map(data => {
      this._timeStamp = data.headers.get('date') ? new Date(data.headers.get('date')).getTime() / 1000 : this._timeStamp;
      return data;
    });
  }

  /**
   * 辅助方法，生成请求检索参数,适用于params请求，非body
   * @param objParams 简单的obj对象，非实例
   * @returns {URLSearchParams}
   */
  public generateURLSearchParams(objParams: any): URLSearchParams {
    const searchParams = new URLSearchParams();

    if (isNullOrUndefined(objParams)) {
      return searchParams;
    }

    Object.getOwnPropertyNames(objParams).forEach(property => {
      if (!isNullOrUndefined(objParams[property])) {
        searchParams.set(property, objParams[property]);
      }
    });

    // 移除无效属性
    if (objParams instanceof ZCoreBase) {
      const skipList = objParams.skipProperties();
      skipList.forEach(property => {
        searchParams.delete(property);
      });
    }

    return searchParams;
  }

  /**
   * 辅助方法,就是在上面的方法基础上加上了分页信息两个字段
   * @param objParams 简单的obj对象，非实例
   */
  public generateListURLSearchParams(objParams: any): URLSearchParams {
    const searchParams = this.generateURLSearchParams(objParams);
    searchParams.set('page_num', '1');
    searchParams.set('page_size', '45');
    searchParams.set('page_limit', '45');
    return searchParams;
  }
}

/*返回结果处理*/
export abstract class LinkResponse {

  public results: Array<any>;
  public linkUrl: string;

  constructor(httpResponse: any) {
    const results = httpResponse.json();
    const linkInfo = httpResponse.headers.get('Link');
    if (linkInfo) {
      this.linkUrl = linkInfo.split('>')[0].split('<')[1];
    }
    this.results = this.generateEntityData(results);
  }

  public abstract generateEntityData(results: Array<any>): Array<any>;
}

export class DefaultLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<any> {
    return results;
  }
}

export class HttpErrorEntity extends ZCoreBase {
  public message: string;
  public errors: Array<HttpErrorContentEntity>;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'errors') {
      return HttpErrorContentEntity;
    }
    return null;
  }
}

export class HttpErrorContentEntity extends ZCoreBase {
  public field: string;
  public code: string|'invalid'|'already_exist';
  public resource: string;
}
