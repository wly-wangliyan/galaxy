import {Injectable} from '@angular/core';
import {ZCoreBase} from '../../../utils/z-core';
import {LinkResponse, HttpService} from '../../core/http.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {CompanyBasicInfoEntity} from '../basics/operation-company/operation-company.model';
import {ParkingBasicInfoEntity} from '../parkings/parkings.model';
import {ManufacturerPlatFormEntity} from '../basics/manufacturer/manufacturer.model';
import {ExceptionWarningEntity} from "../exceptions/exceptions-http.service";
import {url} from "inspector";
import {UserPermissionGroupEntity} from "../../core/auth.service";

export class LogListEntity extends ZCoreBase {
  public log_id: string; // 	String	主键ID
  public realname: string; // 	Object	日志产生者
  public operation_type: string; // 	String	执行操作
  public message: MessageEntity; // 	Object	操作内容
  public created_time: number; // 	Float	执行时间(创建时间)

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'message') {
      return MessageEntity;
    }
    return null;
  }
}

export class MessageEntity extends ZCoreBase {
  public entry_end: number;
  public entry_start: number;
  public parking: string;
  public created_time: string;
  public department: string;
  public email: string;
  public is_superuser: boolean;
  public realname: string;
  public remarks: string;
  public role: number;
  public telephone: string;
  public updated_time: number;
  public username: string;
  public permission_groups: PermissionGroupsEntity;
  public new_user: MessageEntity;
  public old_user: MessageEntity;

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'new_user' || propertyName === 'old_user') {
      return MessageEntity;
    } else if (propertyName === 'permission_groups') {
      return PermissionGroupsEntity;
    }
    return null;
  }
}

export class PermissionGroupsEntity extends ZCoreBase {
  public chinese_name: string;
  public english_name: string;
  public permission_group_id: string;
}

@Injectable()
export class LogHttpService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 获取系统日志列表
   * @Param LogListSearchParams
   * @return {Observable<R>}
   */
  public requestLogList(searchParams: LogListSearchParams): Observable<LogListLinkResponse> {
    const param = searchParams;
    return this.httpService.get(environment.CIPP_UNIVERSE + '/logs', param).map(data => new LogListLinkResponse(data));
  }

  /**
   * 通过link获取列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueLogList(url: string): Observable<LogListLinkResponse> {
    return this.httpService.get(url).map(data => new LogListLinkResponse(data));
  }

  /**
   * 获取系统日志详情
   */
  public requestLogDetails(log_id: string): Observable<LogListLinkResponse> {
    const httpUrl = `environment.CIPP_UNIVERSE/logs/${log_id}`
    return this.httpService.get(httpUrl, log_id).map(data => new LogListLinkResponse(data));
  }
}

export class LogListSearchParams {
  public realname: string; // 	String	F	操作人姓名
  public operation_type: string; // 	String	F	执行操作
  public page_num = 1;  // 	Int	F	页码 默认:1
  public page_size = 45; // 	Int	F	每页条数 默认:45
}

export class LogListLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<LogListEntity> {
    const tempList: Array<LogListEntity> = [];
    results.forEach(res => {
      tempList.push(LogListEntity.Create(res));
    });
    return tempList;
  }
}
