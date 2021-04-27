import {environment} from './environments/environment';
import {isUndefined} from 'util';

/**
 * Created by zack on 12/5/17.
 */
export const initializer: any = {

  user: null,
  startTimeStamp: null, // 首次的服务器时间戳
  statusCode: null,

  boot: (callback) => {
    initializer.getUserMessage(callback);
  },
  getUserMessage: (callback: any) => {
    const header = {
      xhrFields: {
        withCredentials: true
      }
    };

    $.ajax(`${environment.CIPP_UNIVERSE}/user`, header).done((userData, status, xhr) => {
      if (isUndefined(userData.role) || userData.role === 1) {
        // 判断角色是否为平台用户
        initializer.user = userData;
      }
      initializer.statusCode = 200;
      initializer.startTimeStamp = new Date(xhr.getResponseHeader('date')).getTime() / 1000;
      callback();
    }).fail(err => {
      initializer.statusCode = err.status;
      if (err.status === 403) {
        initializer.statusCode = 403;
        callback();
      } else {
        initializer.statusCode = err.status;
        // 网络错误怎么办？不考虑了。。。by zwl 2017.8.17
      }
    });
  }
};
