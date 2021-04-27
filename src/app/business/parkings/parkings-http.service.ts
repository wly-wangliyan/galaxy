import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpService, LinkResponse} from '../../core/http.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {FileUpdate} from '../../../utils/file-update';
import {
  BasicParkingSearchParams,
  ParkingBindCompanyEntity, ParkingBindPlatformEntity,
  ParkingEntity, ParkingGroupsEntity, ParkingRelationEntity,
  ParkingsSearchParams, ParkingUpdateRecordEntity,
  ParkingUpdateRecordSearchParams
} from './parkings.model';
import {Subject} from "rxjs/Subject";
import {ParkingDynamicsInfoEntity} from "../data-statistics/data-statistics.model";

@Injectable()
export class ParkingsHttpService {

  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 条件检索停车场
   * @param searchParams
   * @param isList
   * @returns {OperatorFunction<T, R>}
   */
  public requestParkingsData(searchParams: ParkingsSearchParams, isList: boolean = true): Observable<ParkingsLinkResponse> {
    const url = this.domain + '/parkings';
    let params = this.httpService.generateListURLSearchParams(searchParams);
    if (!isList) {
      params = this.httpService.generateURLSearchParams(searchParams);
    }
    return this.httpService.get(url, params).map(data => new ParkingsLinkResponse(data));
  }

  /**
   * 通过link查看停车场列表
   * @param url
   * @returns {Observable<R>}
   */
  public continueParkingsData(url: string): Observable<ParkingsLinkResponse> {
    return this.httpService.get(url).map(data => new ParkingsLinkResponse(data));
  }

  /**
   * 请求所有停车场
   * @returns {Subject<Array<ParkingEntity>>}
   */
  public requestAllParkingData() {
    const url = this.domain + '/parkings?page_num=1&page_size=1000';
    const subject = new Subject<Array<ParkingEntity>>();
    this.requestLinkAllParkingList(url, [], subject);
    return subject;
  }

  private requestLinkAllParkingList(url: string, dataArray: Array<ParkingEntity>, subject: Subject<Array<any>>) {
    this.httpService.get(url).subscribe(data => {
      // 数据转换
      const results = data.json();
      results.forEach(jsonObj => {
        dataArray.push(ParkingEntity.Create(jsonObj));
      });

      // 查看是否有分页,如果有则继续获取
      const linkInfo: string = data.headers.get('Link');
      if (linkInfo) {
        const linkUrl = linkInfo.split('>')[0].split('<')[1];
        this.requestLinkAllParkingList(linkUrl, dataArray, subject);
      } else {
        subject.next(dataArray);
        subject.complete();
      }
    }, err => {
      subject.error(err);
    });
  }

  /**
   * 添加停车场
   * @param parkingsParams
   * @returns {Observable<Response>}
   */
  public requestAddParkingsData(parkingsParams: ParkingEntity): Observable<Response> {
    const url = this.domain + '/parkings';
    const body = parkingsParams.toEditJson();
    return this.httpService.post(url, body);
  }

  /**
   * 编辑停车场
   * @param parkingsParams
   * @param parkingId
   * @returns {Observable<Response>}
   */
  public requestUpdateParkingsData(parkingsParams: ParkingEntity, parkingId: string): Observable<Response> {
    const url = this.domain + '/parkings/' + parkingId;
    const body = parkingsParams.toEditJson();
    return this.httpService.put(url, body);
  }

  /**
   * 获取指定停车场
   * @param parkingId
   * @returns {Observable<R>}
   */
  public requestParkingsByIdData(parkingId: string): Observable<ParkingEntity> {
    const url = this.domain + '/parkings/' + parkingId;
    return this.httpService.get(url).map(data => ParkingEntity.Create(data.json()));
  }

  /**
   * 注销停车场
   * @param parkingId
   * @returns {Observable<Response>}
   */
  public requestCancelParkingsData(parkingId: string) {
    const url = this.domain + '/parkings/' + parkingId + '/cancel';
    return this.httpService.delete(url);
  }

  /**
   * 查询停车场变更记录
   * @param searchParams
   * @param parkingId
   * @returns {Observable<R>}
   */
  public requestParkingUpdateRecordData(searchParams: ParkingUpdateRecordSearchParams, parkingId: string): Observable<ParkingsUpdateRecordLinkResponse> {
    const url = this.domain + '/parkings/' + parkingId + '/update_records';
    const params = this.httpService.generateURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new ParkingsUpdateRecordLinkResponse(data));
  }

  /**
   * 通过link查看停车场变更记录
   * @param url
   * @returns {Observable<R>}
   */
  public continueParkingUpdateRecord(url: string): Observable<ParkingsUpdateRecordLinkResponse> {
    return this.httpService.get(url).map(data => new ParkingsUpdateRecordLinkResponse(data));
  }

  /**
   * 停车场绑定运营公司
   * @param companyParams
   * @param parkingId
   * @returns {Observable<Response>}
   */
  public requestBindCompanyData(companyParams: ParkingBindCompanyEntity, parkingId: string): Observable<Response> {
    const url = this.domain + '/parkings/' + parkingId + '/company';
    const body = companyParams.json();
    return this.httpService.put(url, body);
  }

  /**
   * 停车场绑定收费平台
   * @param platformParams
   * @param parkingId
   * @returns {Observable<Response>}
   */
  public requestBindPlatformData(platformParams: ParkingBindPlatformEntity, parkingId: string): Observable<Response> {
    const url = this.domain + '/parkings/' + parkingId + '/platform';
    const body = platformParams.json();
    return this.httpService.put(url, body);
  }

  /**
   * 停车场分组
   * @param groupsParams
   * @param parkingId
   * @returns {Observable<Response>}
   */
  public requestParkingGroupsData(groupsParams: ParkingGroupsEntity, parkingId: string): Observable<Response> {
    const url = this.domain + '/parkings/' + parkingId + '/parking_groups';
    const body = groupsParams.json();
    return this.httpService.put(url, body);
  }

  /**
   * 查询运营公司的服务停车场信息
   * @param searchParams
   * @param companyId
   * @returns {Observable<R>}
   */
  public requestCompanyParkingsData(searchParams: BasicParkingSearchParams, companyId: string): Observable<BasicParkingsLinkResponse> {
    const url = this.domain + '/companies/' + companyId + '/parkings';
    const params = this.httpService.generateURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new BasicParkingsLinkResponse(data));
  }

  /**
   * 通过link条件查询运营公司的服务停车场信息
   * @param url
   * @returns {Observable<R>}
   */
  public continueCompanyParkingsData(url: string): Observable<BasicParkingsLinkResponse> {
    return this.httpService.get(url).map(data => new BasicParkingsLinkResponse(data));
  }

  /**
   * 查询收费系统的服务停车场信息
   * @param searchParams
   * @param platformId
   * @returns {Observable<R>}
   */
  public requestPlatformParkingsData(searchParams: BasicParkingSearchParams, platformId: string): Observable<BasicParkingsLinkResponse> {
    const url = this.domain + '/platforms/' + platformId + '/parkings';
    const params = this.httpService.generateURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new BasicParkingsLinkResponse(data));
  }

  /**
   * 通过link条件查询收费系统的服务停车场信息
   * @param url
   * @returns {Observable<R>}
   */
  public continuePlatformParkingsData(url: string): Observable<BasicParkingsLinkResponse> {
    return this.httpService.get(url).map(data => new BasicParkingsLinkResponse(data));
  }

  /**
   * 上传图片
   * @param file
   * @returns {any}
   */
  public requestUploadPicture(file: any, imgIndex: any): Observable<any> {
    const url = environment.CIPP_UNIVERSE + '/storages/images';
    return Observable.create(observer => {
      FileUpdate(file, url, (upProgress) => {
        if (upProgress.lengthComputable) {
          /**
           * upProgress.loaded：文件上传的大小
           * upProgress.total：文件总的大小
           */
          const percentComplete = Math.round((upProgress.loaded) * 100 / upProgress.total);
          observer.next({'imgIndex': imgIndex, 'upProgress': percentComplete});
        }
      }, (sourceUrl) => {
        observer.next({'sourceUrl': sourceUrl});
        observer.complete();
      }, (err) => {
        observer.error(err);
      });
    });
  }

  /**
   * 停车场解除运营关系
   * @param parking_id 停车场id
   * @returns {Observable<Response>}
   */
  public requestCancelRelation(parking_id: string): Observable<Response> {
    return this.httpService.put(this.domain + `/parkings/${parking_id}/relation/cancel`);
  }

  /**
   * 获取停车场运营关系
   * @param {string} parking_id
   * @returns {Observable<ParkingRelationEntity>}
   */
  public requestParkingRelationDetail(parking_id: string): Observable<ParkingRelationEntity> {
    return this.httpService.get(this.domain + `/parkings/${parking_id}/relation`)
      .map(data => ParkingRelationEntity.Create(data.json()));
  }
}

export class ParkingsLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ParkingEntity> {
    const tempList: Array<ParkingEntity> = [];
    results.forEach(res => {
      tempList.push(ParkingEntity.Create(res));
    });
    return tempList;
  }
}

export class ParkingsUpdateRecordLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ParkingUpdateRecordEntity> {
    const tempList: Array<ParkingUpdateRecordEntity> = [];
    results.forEach(res => {
      tempList.push(ParkingUpdateRecordEntity.Create(res));
    });
    return tempList;
  }
}

export class BasicParkingsLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ParkingEntity> {
    const tempList: Array<ParkingEntity> = [];
    results.forEach(res => {
      tempList.push(ParkingEntity.Create(res));
    });
    return tempList;
  }
}
