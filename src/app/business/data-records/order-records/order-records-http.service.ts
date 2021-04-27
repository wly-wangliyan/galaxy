import {Injectable} from '@angular/core';
import {nonEnumerable, ZCoreBase} from '../../../../utils/z-core';
import {environment} from '../../../../environments/environment';
import {HttpService, LinkResponse} from '../../../core/http.service';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';
import {ParkingBasicInfoEntity} from '../../parkings/parkings.model';

export class SearchOrderRecordParams {
  public parking_name: string; // 停车场名称
  public car_id: string; // 车牌号
  public user_types = ''; // 逗号分割的用户类型code
  public paid_type = ''; // 支付类型
  public entry_section: string; // 时间戳区间, 单位秒
  public paid_section: string; // 时间戳区间, 单位秒
  public has_discount = ''; // 是否优惠，true/false
  public section: string; // 时间戳区间, 单位秒
  public page_limit: number; // 每页限制
  public order_by: string; // 排序
}

/**
 * UserType
 * tmp  临时
 * white  白名单
 * black  黑名单
 * timely  包时
 * count  包次
 * other  其他
 */
export class ParkingFeeEntity extends ZCoreBase {
  public fee_id: string; // 上传记录ID
  public parking: ParkingBasicInfoEntity; // 停车场信息
  public parking_id: string; // 停车场ID
  public parking_name: string; // 停车场名称
  public car_id: string; // 车牌号码，无牌车为无+数字，可能没有数字
  public user_types: Array<string>; // 用户类型，详情见UserType
  public entry_time: number; // 入场时间
  public discounts: Array<DiscountEntity>; // 优惠列表
  public receivable_amount: any; // 应收金额
  public received_amount: any; // 实收金额
  public received_time: number; // 收费时间
  public paid_type: string; // 支付方式 PaidType
  public updated_time: number; // 更新时间
  public created_time: number; // 创建时间
  public start_time: number; // 计费开始时间
  public end_time: number; // 计费结束时间

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking') {
      return ParkingBasicInfoEntity;
    } else if (propertyName === 'discounts') {
      return DiscountEntity;
    }
    return null;
  }

  @nonEnumerable
  public get receivable_amount_VO(): any {
    if (!isNullOrUndefined(this.receivable_amount) && this.receivable_amount !== '') {
      return (this.receivable_amount / 100).toFixed(2);
    }
    return '--';
  }

  @nonEnumerable
  public get received_amount_VO(): any {
    if (!isNullOrUndefined(this.received_amount) && this.received_amount !== '') {
      return (this.received_amount / 100).toFixed(2);
    }
    return '--';
  }
}

export class DiscountEntity extends ZCoreBase {
  public type: number; // 类型， 1时间，单位分 2钱，单位分 3折扣，单位%
  public value: number; // 数值
}

@Injectable()
export class OrderRecordsHttpService {

  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 条件检索订单记录
   * @param searchParams
   * @returns {OperatorFunction<T, R>}
   */
  public requestOrderRecordsData(searchParams: SearchOrderRecordParams): Observable<OrderRecordsLinkResponse> {
    const url = this.domain + '/parking_fees';
    const params = this.httpService.generateListURLSearchParams(searchParams);
    // 对无牌车的传值进行特殊处理,服务器只识别无
    const key_car_id = '无牌车';
    if (searchParams.car_id && key_car_id.indexOf(searchParams.car_id) >= 0) {
      params.set('car_id', '无');
    }
    return this.httpService.get(url, params).map(data => new OrderRecordsLinkResponse(data));
  }

  /**
   * 通过link条件检索订单记录
   * @param url
   * @returns {OperatorFunction<T, R>}
   */
  public continueOrderRecordsData(url: string): Observable<OrderRecordsLinkResponse> {
    return this.httpService.get(url).map(data => new OrderRecordsLinkResponse(data));
  }
}

export class OrderRecordsLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ParkingFeeEntity> {
    const tempList: Array<ParkingFeeEntity> = [];
    results.forEach(res => {
      tempList.push(ParkingFeeEntity.Create(res));
    });
    return tempList;
  }
}
