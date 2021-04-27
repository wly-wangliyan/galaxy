import {Injectable} from '@angular/core';
import {HttpService, LinkResponse} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {
  ManufacturerEntity,
  ManufacturerPlatFormEntity,
  ManufacturerSearchParams, PlatformOnlineEntity,
  PlatformOnlineSearchParams
} from './manufacturer.model';

@Injectable()
export class ManufacturerHttpService {

  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 获取系统厂商列表
   * @param searchParams
   * @returns {Observable<R>}
   */
  public requestManufacturerList(searchParams: ManufacturerSearchParams): Observable<ManufacturerLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(this.domain + '/manufacturers', params).map(data => new ManufacturerLinkResponse(data));
  }

  /**
   * 通过link获取系统厂商列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueManufacturerList(url: string): Observable<ManufacturerLinkResponse> {
    return this.httpService.get(url).map(data => new ManufacturerLinkResponse(data));
  }

  /**
   * 查询系统厂商详情
   * @param manufacturer_id 系统厂商id
   * @returns {Observable<R>}
   */
  public requestManufacturerById(manufacturer_id: string): Observable<ManufacturerEntity> {
    return this.httpService.get(this.domain + '/manufacturers/' + manufacturer_id).map(data => ManufacturerEntity.Create(data.json()));
  }

  /**
   * 查询系统厂商的停车管理系统列表
   * @param manufacturer_id 系统厂商id
   * @returns {Observable<R>}
   */
  public requestManufacturerPlatformList(manufacturer_id: string): Observable<ManufacturerPlatFormLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(null);
    return this.httpService.get(this.domain + '/manufacturers/' + manufacturer_id + '/platform_beians', params).map(data => new ManufacturerPlatFormLinkResponse(data));
  }

  /**
   * 通过link获取系统厂商的停车管理系统列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueManufacturerPlatformList(url: string): Observable<ManufacturerPlatFormLinkResponse> {
    return this.httpService.get(url).map(data => new ManufacturerPlatFormLinkResponse(data));
  }

  /**
   * 查询系统厂商的停车管理系统详情
   * @param manufacturer_id 系统厂商id
   * @param platform_id 管理系统id
   * @returns {Observable<R>}
   */
  public requestManufacturerPlatformById(manufacturer_id: string, platform_id: string): Observable<ManufacturerPlatFormEntity> {
    return this.httpService.get(`${this.domain}/manufacturers/${manufacturer_id}/platform_beians/${platform_id}`).map(data => ManufacturerPlatFormEntity.Create(data.json()));
  }

  /**
   * 查询系统厂商下的停车场信息
   * @param searchParams 参数列表
   * @param manufacturer_id 系统厂商id
   * @returns {Observable<R>}
   */
  public requestManufacturerParkingList(searchParams: PlatformOnlineSearchParams, manufacturer_id: string): Observable<PlatformOnlineLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(this.domain + '/manufacturers/' + manufacturer_id + '/parkings', params).map(data => new PlatformOnlineLinkResponse(data));
  }

  /**
   * 通过link查询系统厂商下的停车场信息
   * @param url url
   * @returns {Observable<R>}
   */
  public continueManufacturerParkingList(url: string): Observable<PlatformOnlineLinkResponse> {
    return this.httpService.get(url).map(data => new PlatformOnlineLinkResponse(data));
  }
}

export class ManufacturerLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ManufacturerEntity> {
    const tempList: Array<ManufacturerEntity> = [];
    results.forEach(res => {
      tempList.push(ManufacturerEntity.Create(res));
    });
    return tempList;
  }
}

export class ManufacturerPlatFormLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ManufacturerPlatFormEntity> {
    const tempList: Array<ManufacturerPlatFormEntity> = [];
    results.forEach(res => {
      tempList.push(ManufacturerPlatFormEntity.Create(res));
    });
    return tempList;
  }
}

export class PlatformOnlineLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<PlatformOnlineEntity> {
    const tempList: Array<PlatformOnlineEntity> = [];
    results.forEach(res => {
      tempList.push(PlatformOnlineEntity.Create(res));
    });
    return tempList;
  }
}
