import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpService} from '../../../../core/http.service';
import {ZCoreBase} from '../../../../../utils/z-core';
import {Observable} from 'rxjs/Observable';

export class AccessParkingStateEntity extends ZCoreBase {
  public access_inside_parking_num: number; // 已接入路内停车场数
  public access_outside_parking_num: number; // 已接入路外停车场数
  public operate_inside_parking_num: number; // 已运营路内停车场数
  public operate_outside_parking_num: number; // 已运营路外停车场数
  public access_parking_total_num: number; // 已接入停车场总数
  public access_inside_space_num: number; // *已接入路内泊位数
  public access_outside_space_num: number; // *已接入路外泊位数
  public operate_inside_space_num: number; // 已运营路内泊位数
  public operate_outside_space_num: number; // *已运营路外泊位数
  public access_space_total_num: number; // 已接入总泊位数
  public access_inside_fee_space_num: number; // *已接入路内已收费泊位数
  public parking_total_num: number; // 停车场总数
  public space_total_num: number; // 泊位总数
}

export class TotalParkingFeesEntity extends ZCoreBase {
  public total_amount: number;
}

@Injectable()
export class ChartFullScreen2HttpService {
  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 获取接入和运营的停车场数和泊位数
   * @returns {Observable<AccessParkingStateEntity>}
   */
  public requestAccessParkingStateInfo(): Observable<AccessParkingStateEntity> {
    const httpUrl = `${this.domain}/parkings/parkings_space/count`;
    return this.httpService.get(httpUrl).map(data => AccessParkingStateEntity.Create(data.json()));
  }

  /**
   * 获取平台资金结算金额
   * @returns {Observable<TotalParkingFeesEntity>}
   */
  public requestTotalParkingFeesInfo(): Observable<TotalParkingFeesEntity> {
    const httpUrl = `${this.domain}/parkings/parking_fees_total`;
    return this.httpService.get(httpUrl).map(data => TotalParkingFeesEntity.Create(data.json()));
  }
}
