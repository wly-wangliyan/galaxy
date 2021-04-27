import {HttpService} from '../../../core/http.service';
import {ZCoreBase} from '../../../../utils/z-core';
import {Observable} from 'rxjs/Observable';

export class WechatNewUserEntity extends ZCoreBase {
  public wechat_user_by_day_id: string;  // 微信用户量按天统计id
  public wechat_new_user: number;        // 微信新增用户数
  public wechat_total_user: number;      // 微信用户总数
  public wechat_cancel_user: number;     // 微信取消关注用户数
  public wechat_net_increase_user: number; // 微信净增用户数
  public time_point: number;             // 每天时间点
}

export class MXNewUserEntity extends ZCoreBase {
  public mx_user_by_day_id: string;      // 美行用户量按天统计id
  public mx_new_user: number;            // 美行ad和ios新增用户数
  public time_point: number;             // 每天时间点
}

export class TotalUserCountEntity extends ZCoreBase {
  public user_by_hour_id: string;        // 用户总数按时统计id
  public total_user: number;             // 用户总数
  public time_point: number;             // 每天时间点
}

export class DSUserHttpService {
  private domain: string;
  private httpService: HttpService;

  constructor(httpService: HttpService, domain: string) {
    this.domain = domain;
    this.httpService = httpService;
  }

  /**
   * 按天查微信新用户数
   * @param {NewUserParams} params
   * @returns {Observable<Response>}
   */
  public requestWechatNewUserCountByDay(params: NewUserParams): Observable<Array<WechatNewUserEntity>> {
    const httpUrl = this.domain + '/user_statistics/wechat_new_user_count_by_day';
    return this.httpService.get(httpUrl, params).map(data => {
      const tempList = [];
      data.json().forEach(jsonObj => {
        tempList.push(WechatNewUserEntity.Create(jsonObj));
      });
      return tempList;
    });
  }

  /**
   * 按天查美行新用户数
   * @param {NewUserParams} params
   * @returns {Observable<Response>}
   */
  public requestMxNewUserCountByDay(params: NewUserParams): Observable<Array<MXNewUserEntity>> {
    const httpUrl = this.domain + '/user_statistics/mx_new_user_count_by_day';
    return this.httpService.get(httpUrl, params).map(data => {
      const tempList = [];
      data.json().forEach(jsonObj => {
        tempList.push(MXNewUserEntity.Create(jsonObj));
      });
      return tempList;
    });
  }

  /**
   * 用户总数
   * @returns {Observable<Array<TotalUserCountEntity>>}
   */
  public requestTotalUserCount(): Observable<TotalUserCountEntity> {
    const httpUrl = this.domain + '/user_statistics/total_user_count';
    return this.httpService.get(httpUrl).map(data => TotalUserCountEntity.Create(data.json()));
  }
}

export class NewUserParams {
  public section: string;   // F 时间区间,开始和结束时间以逗号分割
  public order_by: string;  // F 排序:'-time_point','time_point'
  public page_size = 50;     // F 每页限制
  public page_num = 1;  // F 页码
}
