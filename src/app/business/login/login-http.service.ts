import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {ZCoreBase} from '../../../utils/z-core';

export class LoginResultEntity extends ZCoreBase {
  public role: number; // 角色 1:平台用户 2: 系统厂商 3: 物业公司
  public username: string;
}

@Injectable()
export class LoginHttpService {
  constructor(private httpService: HttpService) {
  }

  /**
   * 请求登录
   * @param username 名称
   * @param password 密码
   * @returns {Observable<LoginResultEntity>}
   */
  public requestLogin(username: string, password: string): Observable<LoginResultEntity> {
    const body = {
      username: username,
      password: password,
    };
    return this.httpService.postFormData(environment.CIPP_UNIVERSE + '/login', body).map(data => LoginResultEntity.Create(data.json()));
  }

  /**
   * 请求修改密码
   * @param oldPwd 旧密码
   * @param newPwd 新密码
   * @returns {Observable<Response>}
   */
  public requestModifyPassword(oldPwd: string, newPwd: string): Observable<Response> {
    const body = {
      old_password: oldPwd,
      new_password: newPwd,
    };
    return this.httpService.put(environment.CIPP_UNIVERSE + '/user/password', body);
  }
}
