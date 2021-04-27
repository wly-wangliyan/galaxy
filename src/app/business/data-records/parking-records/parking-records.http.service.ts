import {Injectable} from '@angular/core';
import {ZCoreBase, nonEnumerable} from '../../../../utils/z-core';
import {environment} from '../../../../environments/environment';
import {HttpService, LinkResponse} from '../../../core/http.service';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';
import {ParkingBasicInfoEntity} from '../../parkings/parkings.model';
import {CompanyBasicInfoEntity} from '../../basics/operation-company/operation-company.model';
import {PlatformBasicInfoEntity} from '../../basics/manufacturer/manufacturer.model';

/*
 * UserType
 * tmp	临时
 white	白名单
 black	黑名单
 timely	包时
 count	包次
 other	其他
 *
 * */

export class ParkingRecordEntity extends ZCoreBase {
  public record_id: string; // String(32) 记录ID
  public parking: ParkingBasicInfoEntity; // Json	停车场信息
  public company: CompanyBasicInfoEntity; // Json	运营公司信息
  public platform: PlatformBasicInfoEntity; // Json	收费系统信息
  public car_id: string; // String	车牌号码，无牌车为无+数字，可能没有数字
  public user_types: Array<string>; // 用户类型，详情见UserType
  public entry_time: number; // Float	入场时间
  public exit_time: number; // Float	出场时间
  public receive_amount: any; // Int	实收金额，单位分
  public spot_no: string; // CharField	车位编号
  public updated_time: number; // Float	更新时间
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

  @nonEnumerable
  public get receive_amount_VO(): any {
    if (isNullOrUndefined(this.exit_time)) {
      return '--';
    }
    if (!isNullOrUndefined(this.receive_amount) && this.receive_amount !== '') {
      return (this.receive_amount / 100).toFixed(2);
    }
    return '--';
  }
}

@Injectable()
export class ParkingRecordsHttpService {

  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 条件检索停车记录
   * @param searchParams 参数列表
   * @returns {Observable<R>}
   */
  public requestParkingRecordsData(searchParams: SearchParkingRecordParams): Observable<ParkingRecordsLinkResponse> {
    const url = this.domain + '/parking_records';
    const params = this.httpService.generateListURLSearchParams(searchParams);
    // 对无牌车的传值进行特殊处理,服务器只识别无
    const key_car_id = '无牌车';
    if (searchParams.car_id && key_car_id.indexOf(searchParams.car_id) >= 0) {
      params.set('car_id', '无');
    }
    // 免费放行时需要传递离场时间不为空
    searchParams.receive_amount === 'eq0' && !searchParams.exit_section && params.set('exit_section', '0,');

    return this.httpService.get(url, params).map(data => new ParkingRecordsLinkResponse(data));
  }

  /**
   * 通过link条件检索停车记录
   * @param url url
   * @returns {Observable<R>}
   */
  public continueParkingRecordsData(url: string): Observable<ParkingRecordsLinkResponse> {
    return this.httpService.get(url).map(data => new ParkingRecordsLinkResponse(data));
  }

  /**
   * 请求导出停车记录
   * @param url url
   * @returns {Observable<R>}
   */
  public requestExportParkingRecordData(exportParams: ExportParkingRecordParams) {
    const body = exportParams.json();
    return this.httpService.get(this.domain + `/parking_records/export`, body);
  }
}

export class SearchParkingRecordParams {
  public parking_name: string; // String	F	停车场名称
  public company_name: string; // String	F	运营公司名称
  public platform_name: string; // String	F	收费系统名称
  public car_id: string; // String	F	车牌号
  public user_types = ''; // String	F	逗号分割的用户类型code
  public entry_section: string; // String	F	时间戳区间, 单位秒
  public exit_section: string; // String	F	时间戳区间, 单位秒
  public receive_amount = ''; // String	F	筛选金额，可以使用前缀(gt-大于, gte-大于等于, lt-小于, lte-小于等于, eq-等于)gte0，例：gte0
  public section: string; // String	F	时间戳区间, 单位秒
  public page_limit: number;
}

export class ParkingRecordsLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ParkingRecordEntity> {
    const tempList: Array<ParkingRecordEntity> = [];
    results.forEach(res => {
      tempList.push(ParkingRecordEntity.Create(res));
    });
    return tempList;
  }
}

/**
 * 导出停车记录
 * @param searchParams 参数列表
 * @returns {Observable<R>}
 */
export class ExportParkingRecordParams extends ZCoreBase {
  public parking_name: string;  //  T	停车场名称
  // public entry_time: string; // F	进场时间段
  // public exit_time: string; // F	出场时间段
  public time_limit: string; //
}
