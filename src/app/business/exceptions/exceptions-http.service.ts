import {Injectable} from '@angular/core';
import {ZCoreBase} from '../../../utils/z-core';
import {Response} from '@angular/http';
import {LinkResponse, HttpService} from '../../core/http.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

export class ExceptionWarningEntity extends ZCoreBase {
  public abnormal_warning_id: string; // String	警告id
  public company_name: string; // String	公司名称
  public company_id: string; // String	公司id
  public platform_name: string; // String	收费系统
  public platform_id: string; // String	收费系统id
  public parking: ParkingEntity; // Json	停车场
  public upload_type: string; // String	根据上传类型分类('parking_record'(停车记录),)
  public reason: string; // String	异常原因
  public duration: number; // Float	异常时长(单位秒)
  public status: number; // Int	警告状态(1:异常,2:已修复)
  public last_upload_time: number; // Float	最后上传时间
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'parking') {
      return ParkingEntity;
    }
    return null;
  }
}

export class ParkingEntity extends ZCoreBase {
  public parking_id: string; // 停车场id/编号
  public parking_name = ''; // 停车场名称
  public contacts = ''; // 联系人
  public telephone = []; // 联系电话
  public area_type = 1; // 用地类型 1:路内 2:路外
}

export class SendUserListEntity extends ZCoreBase {
  public abnormal_receiver_id: string; // id
  public receiver: string; // 姓名
  public email: string; // 邮箱
  public created_time: number; // 创建时间
  public updated_time: number; // 更新时间

  constructor(source?: SendUserListEntity) {
    super();
    if (source) {
      this.abnormal_receiver_id = source.abnormal_receiver_id;
      this.receiver = source.receiver;
      this.email = source.email;
    }
  }

  public skipProperties(): Array<string> {
    const properties = super.skipProperties();
    properties.push('send_user_id');
    properties.push('created_time');
    properties.push('updated_time');
    return properties;
  }
}

export class SendSettingStatue extends ZCoreBase {
  public status = false; // T	状态
}

export class SendUsersLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<SendUserListEntity> {
    const tempList: Array<SendUserListEntity> = [];
    results.forEach(res => {
      tempList.push(SendUserListEntity.Create(res));
    });
    return tempList;
  }
}

@Injectable()
export class ExceptionsHttpService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 获取警告列表
   * @param searchParams
   * @returns {Observable<R>}
   */
  public requestWarningList(searchParams: ExceptionSearchParams): Observable<ExceptionWarningLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(environment.CIPP_UNIVERSE + '/abnormal_warnings', params).map(data => new ExceptionWarningLinkResponse(data));
  }

  /**
   * 通过link获取列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueWarningList(url: string): Observable<ExceptionWarningLinkResponse> {
    return this.httpService.get(url).map(data => new ExceptionWarningLinkResponse(data));
  }

  /**
   * 获取联系人详情
   * @param searchParams
   * @returns {Observable<R>}
   */
  public requestWarningDetail(abnormal_warning_id: string): Observable<ExceptionWarningEntity> {
    return this.httpService.get(environment.CIPP_UNIVERSE + `/abnormal_warnings/${abnormal_warning_id}`).map(data => {
      const tempResults = data.json();
      return ExceptionWarningEntity.Create(tempResults);
    });
  }

  /**
   * 获取收件人信息列表
   * @returns {Observable<SendUsersLinkResponse>}
   */
  public requestSendUsersData(): Observable<SendUsersLinkResponse> {
    const param = {page_size: 45, page_num: 1};
    const url = environment.CIPP_UNIVERSE + `/abnormal_warning/receivers`;
    return this.httpService.get(url, param).map(data => new SendUsersLinkResponse(data));
  }

  /**
   * 通过link获取列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueSendUsersList(url: string): Observable<SendUsersLinkResponse> {
    return this.httpService.get(url).map(data => new SendUsersLinkResponse(data));
  }

  /**
   * 修改收件人信息
   * @param {SendUserListEntity} modifyParam
   * @param {string} send_user_id
   * @returns {Observable<Response>}
   */
  public requestModifySendUserData(modifyParam: SendUserListEntity, abnormal_receiver_id: string): Observable<Response> {
    const url = environment.CIPP_UNIVERSE + `/abnormal_warning/receivers/${abnormal_receiver_id}`;
    const body = modifyParam.json();
    return this.httpService.put(url, body);
  }

  /**
   * 添加收件人信息
   * @param {SendUserListEntity} addParam
   * @returns {Observable<Response>}
   */
  public requestAddSendUserData(addParam: SendUserListEntity): Observable<Response> {
    const url = environment.CIPP_UNIVERSE + `/abnormal_warning/receivers`;
    const body = addParam.json();
    return this.httpService.post(url, body);
  }

  /**
   * 删除收件人信息
   * @param {string} send_user_id
   * @returns {Observable<Response>}
   */
  public requestDeleteSendUserData(abnormal_receiver_id: string): Observable<Response> {
    const url = environment.CIPP_UNIVERSE + `/abnormal_warning/receivers/${abnormal_receiver_id}`;
    return this.httpService.delete(url);
  }

  /**
   * 获取推送状态
   * @returns {Observable<SendSettingStatue>}
   */
  public requestSendSettingStatueData(): Observable<SendSettingStatue> {
    const url = environment.CIPP_UNIVERSE + `/abnormal_warning/setting`;
    return this.httpService.get(url).map(data => SendSettingStatue.Create(data.json()));
  }

  /**
   * 修改推送状态
   * @param {SendSettingStatue} modifyParam
   * @returns {Observable<Response>}
   */
  public requestModifySendSettingStatueData(modifyParam: SendSettingStatue): Observable<Response> {
    const url = environment.CIPP_UNIVERSE + `/abnormal_warning/setting`;
    const body = modifyParam.json();
    return this.httpService.put(url, body);
  }
}

export class ExceptionSearchParams {
  public parking_name: string; // String	F	停车场名称
  public company_name: string; // String	F	公司名称
  public platform_name: string; // String	F	平台名称
  public status: any = '1'; // Int	F	警告状态
}

export class ExceptionWarningLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<ExceptionWarningEntity> {
    const tempList: Array<ExceptionWarningEntity> = [];
    results.forEach(res => {
      tempList.push(ExceptionWarningEntity.Create(res));
    });
    return tempList;
  }
}
