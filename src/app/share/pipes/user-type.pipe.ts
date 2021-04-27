import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export const DefaultUserType = ['tmp', 'timely', 'count', 'white', 'black', 'visitor', 'space_sharing', 'reservation', 'other'];

const userTypeObj = {
  tmp: '临时',
  white: '白名单',
  black: '黑名单',
  timely: '包时',
  count: '包次',
  visitor: '访客',
  reservation: '预约',
  space_sharing: '共享',
  other: '其他',
};

@Pipe({
  name: 'userTypePipe'
})
export class UserTypePipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    if (value && (typeof value === 'string')) {
      // 当直接传递字符串时的处理
      return userTypeObj[value];
    } else if (value && value.length > 0) {
      // 当传递数组类型时的处理
      let str = '';
      Observable.from(value).distinct().subscribe((code: any) => {
        // 拼接字符串
        str = str ? str + ',' + userTypeObj[code] : userTypeObj[code];
      });
      return str;
    }
  }
}
