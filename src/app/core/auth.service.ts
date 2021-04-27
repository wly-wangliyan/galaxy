import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {ZCoreBase} from '../../utils/z-core';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';
import {initializer} from '../../initializer';

export class UserPermissionGroupEntity extends ZCoreBase {
  public permission_group_id: string; // string	T	权限组id
  public english_name: string; // string	T	权限组名称(英文)
  public chinese_name: string; // string	T	权限组名称(中文)
  public is_deleted: string; // bool  T	是否刪除
  public created_time: string; // double	T	创建时间
  public updated_time: string; // double	T	更新时间
}

export class UserEntity extends ZCoreBase {
  public role: number; // 角色 1:平台用户 2: 系统厂商 3: 物业公司
  public username: string; // String	员工id
  public realname: string; // String	姓名
  public telephone: string; // Array	联系方式
  public email: string; // String	邮箱
  public permission_groups: Array<UserPermissionGroupEntity>; // Array	权限组
  public department: string; // String	部门
  public remarks: string; // String	备注
  public updated_time: number; // Float	更新时间
  public created_time: number; // Float	创建时间
  public is_superuser: boolean; // 是否为管理员

  public getPropertyClass(propertyName: string): typeof ZCoreBase {
    if (propertyName === 'permission_groups') {
      return UserPermissionGroupEntity;
    }
    return null;
  }
}

@Injectable()
export class AuthService {

  private _isLoggedIn = false;
  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  private _user: UserEntity;
  public get user(): UserEntity {
    return this._user;
  }

  constructor(private router: Router, private httpService: HttpService) {
  }

  /**
   * 秘钥方式授权直接授权
   * @param user 当前用户
   */
  public authorizeBySecretKey(user: UserEntity) {
    this._user = user;
    this._isLoggedIn = !isNullOrUndefined(user);
  }

  /**
   * 登录方式授权获取用户信息
   */
  public authorizeByLogin() {
    this.httpService.get(environment.CIPP_UNIVERSE + '/user').subscribe(data => {
      this._user = UserEntity.Create(data.json());
      this._isLoggedIn = true;
      initializer.statusCode = 200;
      this.router.navigate(['', 'home']);
    }, err => {
      initializer.statusCode = err.status;
    });
  }

  /**
   * 刷新授权信息(修改用户权限时调用)
   */
  public refreshAuthorize() {
    this.httpService.get(environment.CIPP_UNIVERSE + '/user').subscribe(data => {
      this._user = UserEntity.Create(data.json());
    });
  }

  /**
   * 检查权限是否授权
   * @param permissions 权限英文名集合
   * @returns {boolean}
   */
  public checkPermissions(permissions: Array<string>): boolean {
    if (this.user) {
      if (this.user.is_superuser) {
        return true;
      }
      for (const permission of this.user.permission_groups) {
        if (permissions.indexOf(permission.english_name) >= 0) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  /**
   * 授权失败时踢出登录状态
   */
  public kickOut() {
    this._isLoggedIn = false;
    this._user = null;
    this.router.navigate(['login']);
  }

  /**
   * 登出
   */
  public logout() {
    this.httpService.post(environment.CIPP_UNIVERSE + '/logout').subscribe(() => {
      this._isLoggedIn = false;
      this._user = null;
      this.router.navigate(['login']);
    });
  }

  /**
   * 请求权限组列表
   * @returns {Observable<R>}
   */
  public requestPermissionGroups(): Observable<Array<UserPermissionGroupEntity>> {
    return this.httpService.get(environment.CIPP_UNIVERSE + '/permission_groups').map(data => {
      const json = data.json();
      const tempGroups = [];
      json.forEach(jsonObj => {
        tempGroups.push(UserPermissionGroupEntity.Create(jsonObj));
      });
      return tempGroups;
    });
  }
}

/*
 chinese_name: "实时信息", english_name: "realtime_info"
 chinese_name: "数据统计", english_name: "data_statistics"
 chinese_name: "数据记录", english_name: "data_record"
 chinese_name: "异常警告", english_name: "exception_warning"
 chinese_name: "停车场管理", english_name: "parking"
 chinese_name: "基础管理", english_name: "base"
 chinese_name: "员工管理", english_name: "user"
 chinese_name: "停车记录导出", english_name: "parking_record_export"
 * */
