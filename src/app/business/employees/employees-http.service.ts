import {Injectable} from '@angular/core';
import {HttpService, LinkResponse} from '../../core/http.service';
import {ZCoreBase} from '../../../utils/z-core';
import {Observable} from 'rxjs/Observable';
import {UserEntity} from '../../core/auth.service';
import {environment} from '../../../environments/environment';
import {Response} from '@angular/http';

@Injectable()
export class EmployeesHttpService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 获取用户列表
   * @param searchParams
   * @returns {Observable<R>}
   */
  public requestUserList(searchParams: UserSearchParams): Observable<UserLinkResponse> {
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(environment.CIPP_UNIVERSE + '/users', params).map(data => new UserLinkResponse(data));
  }

  /**
   * 通过link获取列表
   * @param url url
   * @returns {Observable<R>}
   */
  public continueUserList(url: string): Observable<UserLinkResponse> {
    return this.httpService.get(url).map(data => new UserLinkResponse(data));
  }

  /**
   * 请求添加用户信息
   * @param editParams 用户参数
   * @returns {Observable<Response>}
   */
  public requestAddUser(editParams: UserEditParams): Observable<Response> {
    const body = editParams.toAddJson();
    return this.httpService.post(environment.CIPP_UNIVERSE + '/users', body);
  }

  /**
   * 请求编辑用户信息
   * @param editParams 用户参数
   * @param username 用户名
   * @returns {Observable<Response>}
   */
  public requestEditUser(editParams: UserEditParams, username: string): Observable<Response> {
    const body = editParams.toEditJson();
    return this.httpService.put(environment.CIPP_UNIVERSE + '/users/' + username, body);
  }

  /**
   * 请求获取用户信息
   * @param username 用户名
   * @returns {Observable<R>}
   */
  public requestUserInfo(username: string): Observable<UserEntity> {
    return this.httpService.get(environment.CIPP_UNIVERSE + '/users/' + username).map(data => {
      return UserEntity.Create(data.json());
    });
  }

  /**
   * 请求删除用户
   * @param username 用户名
   * @returns {Observable<Response>}
   */
  public requestDeleteUser(username: string): Observable<Response> {
    return this.httpService.delete(environment.CIPP_UNIVERSE + '/users/' + username);
  }

  /**
   * 请求重置密码
   * @param username 用户名
   * @returns {Observable<Response>}
   */
  public requestResetPassword(username: string): Observable<Response> {
    return this.httpService.put(environment.CIPP_UNIVERSE + '/users/' + username + '/password/reset');
  }
}

export class UserSearchParams extends ZCoreBase {
  public username: string; // String	F	用户名
  public realname: string; // String F	姓名
  public telephone: string; // String	F	联系电话
  public page_num: number; // int	F	页码
  public page_size: number; // int	F	每页条数
}

export class UserEditParams extends ZCoreBase {
  public username: string; // String	F	用户名
  public realname: string; // String F	姓名
  public telephone: string; // String	F	联系电话
  public email: string; // String	邮箱
  public permission_groups: Array<string>=[]; // Array	权限组
  public department: string; // String	部门
  public remarks: string; // String	备注

  constructor(user?: UserEntity) {
    super();
    if (user) {
      const copy: UserEntity = user.clone();
      this.username = copy.username;
      this.realname = copy.realname;
      this.telephone = copy.telephone;
      this.email = copy.email;
      this.department = copy.department;
      this.remarks = copy.remarks;
      // permission_groups数据在外部处理
    }
  }

  public toAddJson(): any {
    return this.json();
  }

  public toEditJson(): any {
    const json = this.json();
    delete json['username'];
    return json;
  }
}

export class UserLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<UserEntity> {
    const tempList: Array<UserEntity> = [];
    results.forEach(res => {
      tempList.push(UserEntity.Create(res));
    });
    return tempList;
  }
}
