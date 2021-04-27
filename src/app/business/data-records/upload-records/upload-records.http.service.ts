import {Injectable} from '@angular/core';
import {ZCoreBase} from '../../../../utils/z-core';
import {environment} from '../../../../environments/environment';
import {HttpService, LinkResponse} from '../../../core/http.service';
import {Observable} from 'rxjs/Observable';
import {ParkingBasicInfoEntity} from '../../parkings/parkings.model';
import {CompanyBasicInfoEntity} from '../../basics/operation-company/operation-company.model';
import {PlatformBasicInfoEntity} from '../../basics/manufacturer/manufacturer.model';

export class UploadRecordEntity extends ZCoreBase {
  public upload_record_id = ''; // String(32) 上传记录ID
  public parking: ParkingBasicInfoEntity; // Json	停车场信息
  public company: CompanyBasicInfoEntity; // Json	运营公司信息
  public platform: PlatformBasicInfoEntity; // Json	收费系统信息
  public upload_type: string; // 上传类型
  public content: string; // 具体内容
  public created_time: number; // Float	创建时间

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking') {
      return ParkingBasicInfoEntity;
    } else if (propertyName === 'company') {
      return CompanyBasicInfoEntity;
    } else if (propertyName === 'platform') {
      return PlatformBasicInfoEntity;
    }
    return null;
  }
}

@Injectable()
export class UploadRecordsHttpService {

  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 条件检索上传记录
   * @param searchParams 参数列表
   * @returns {Observable<R>}
   */
  public requestUploadRecordsData(searchParams: SearchUploadRecordParams): Observable<UploadRecordsLinkResponse> {
    const url = this.domain + '/upload_records';
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new UploadRecordsLinkResponse(data));
  }

  /**
   * 通过link条件检索上传记录
   * @param url url
   * @returns {Observable<R>}
   */
  public continueUploadRecordsData(url: string): Observable<UploadRecordsLinkResponse> {
    return this.httpService.get(url).map(data => new UploadRecordsLinkResponse(data));
  }

}

export class SearchUploadRecordParams {
  public parking_name: string; // String	F	停车场名称
  public company_name: string; // String	F	运营公司名称
  public platform_name: string; // String	F	收费系统名称
  public section: string; // String	F	时间戳区间, 单位秒
  public page_limit: number;
}

export class UploadRecordsLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<UploadRecordEntity> {
    const tempList: Array<UploadRecordEntity> = [];
    results.forEach(res => {
      tempList.push(UploadRecordEntity.Create(res));
    });
    return tempList;
  }
}
