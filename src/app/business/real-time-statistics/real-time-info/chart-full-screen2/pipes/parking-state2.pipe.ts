import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parkingState2'
})
export class ParkingState2Pipe implements PipeTransform {

  /**
   * 转换方法
   * @param value 状态值
   * @param forColor 是否转换出来颜色,默认不转换出来颜色
   * @returns {any}
   */
  public transform(value: any, forColor: boolean = false): any {
    if (forColor) {
      if (value === 1 || value === '1') {
        return '#2b8b64';
      }
      if (value === 2 || value === '2') {
        return '#e87724';
      }
      if (value === 3 || value === '3') {
        return '#f16161';
      }
      return '#' +
        '';
    } else {
      if (value === 1 || value === '1') {
        return '充足';
      }
      if (value === 2 || value === '2') {
        return '适中';
      }
      if (value === 3 || value === '3') {
        return '紧张';
      }
      return '--';
    }
  }

}
