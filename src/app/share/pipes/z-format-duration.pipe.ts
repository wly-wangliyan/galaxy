import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

/* 格式化一个秒数为时间字符串,单位秒 */
@Pipe({
  name: 'zFormatDuration'
})
export class ZFormatDurationPipe implements PipeTransform {

  public transform(value: any, ignoreSeconds: boolean = false): any {
    let totalSeconds = value;

    if (totalSeconds <= 0) {
      return '0天';
    }

    if (ignoreSeconds) {
      const second = totalSeconds % 3600 % 60;
      if (second !== 0) {
        totalSeconds = totalSeconds - second + 60; // 当秒数不为0时进位(进一分钟)
      }
    }

    const days = Math.floor(Number(totalSeconds / (3600 * 24)));
    const hours = Math.floor(Number(totalSeconds % (3600 * 24) / 3600));
    const minutes = Math.floor(Number(totalSeconds % 3600 / 60));
    const seconds = Math.floor(Number(totalSeconds % 3600 % 60));
    let formatDate = days ? days + '天' : null;
    formatDate = hours ? formatDate + hours + '小时' : formatDate;
    formatDate = minutes ? formatDate + minutes + '分' : formatDate;
    formatDate = seconds ? formatDate + seconds + '秒' : formatDate;

    return isNullOrUndefined(formatDate) ? '--' : formatDate;
  }
}
