import {Injectable} from '@angular/core';
import {HttpService, LinkResponse} from '../../core/http.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {
  ParkingBeianEntity,
  ParkingBeianInfoAuditSearchParams,
  ParkingBeianSearchParams, PlatformAuditBeianSearchParams, PlatformBeianEntity,
  PlatformBeianSearchParams
} from './beian.model';

@Injectable()
export class BeianHttpService {
  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 获取停车场备案信息列表
   * @param {ParkingBeianSearchParams} searchParams
   * @returns {Observable<ParkingBeianLinkResponse>}
   */
  public requestAuditParkingBeianList(searchParams: ParkingBeianSearchParams): Observable<ParkingBeianLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(this.domain + '/parking_beians', params).map(data => new ParkingBeianLinkResponse(data));
  }

  /**
   * 通过link获取列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueAuditParkingBeianList(url: string): Observable<ParkingBeianLinkResponse> {
    return this.httpService.get(url).map(data => new ParkingBeianLinkResponse(data));
  }

  /**
   * 停车场备案信息审核
   * @param parking_beian_id 停车场备案id
   * @returns {Observable<Response>}
   */
  public requestParkingBeianInfoAudit(searchParams: ParkingBeianInfoAuditSearchParams, parking_beian_id: string): Observable<Response> {
    const params = searchParams.json();
    return this.httpService.put(this.domain + `/parking_beians/${parking_beian_id}/reviewed`, params);
  }

  /**
   * 获取停车场备案信息详情
   * @param parking_beian_id 停车场备案id
   * @returns {Observable<ParkingBeianEntity>}
   */
  public requestParkingBeianInfoDetail(parking_beian_id: string): Observable<ParkingBeianEntity> {
    return this.httpService.get(this.domain + `/parking_beians/${parking_beian_id}`).map(data => ParkingBeianEntity.Create(data.json()));
  }

  /**
   * 获取审核系统备案列表
   * @param {PlatformBeianSearchParams} searchParams
   * @returns {Observable<PlatformBeianLinkResponse>}
   */
  public requestPlatformAuditBeianList(searchParams: PlatformBeianSearchParams): Observable<PlatformBeianLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(this.domain + '/platform_beians', params).map(data => new PlatformBeianLinkResponse(data));
  }

  /**
   * 通过link获取列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueAuditPlatformBeianList(url: string): Observable<PlatformBeianLinkResponse> {
    return this.httpService.get(url).map(data => new PlatformBeianLinkResponse(data));
  }

  /**
   * 获取系统备案详情
   * @param platform_beian_id 系统备案id
   * @returns {Observable<PlatformBeianEntity>}
   */
  public requestPlatformAuditBeianDetail(platform_beian_id: string): Observable<PlatformBeianEntity> {
    return this.httpService.get(this.domain + `/platform_beians/${platform_beian_id}`).map(data => PlatformBeianEntity.Create(data.json()));
  }

  /**
   * 审核系统备案
   * @param {BeianInfoDetail} searchParams
   * @param platform_beian_id 系统备案id
   * @returns {Observable<Response>}
   */
  public requestPlatformAuditBeian(searchParams: PlatformAuditBeianSearchParams, platform_beian_id: string): Observable<Response> {
    const body = searchParams.json();
    return this.httpService.put(this.domain + `/platform_beians/${platform_beian_id}/reviewed`, body);
  }
}

export class ParkingBeianLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ParkingBeianEntity> {
    const tempList: Array<ParkingBeianEntity> = [];
    results.forEach(res => {
      tempList.push(ParkingBeianEntity.Create(res));
    });
    return tempList;
  }
}

export class PlatformBeianLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<PlatformBeianEntity> {
    const tempList: Array<PlatformBeianEntity> = [];
    results.forEach(res => {
      tempList.push(PlatformBeianEntity.Create(res));
    });
    return tempList;
  }
}
