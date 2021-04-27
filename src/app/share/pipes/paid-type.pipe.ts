import {Pipe, PipeTransform} from '@angular/core';

export const DefaultPaidType = ['cash', 'ali', 'weixin', 'union', 'etc', 'other'];

const PaidType = {
  cash: '现金',
  ali: '支付宝',
  weixin: '微信',
  union: '银联',
  etc: 'ETC',
  other: '其他',
};

@Pipe({
  name: 'paidTypePipe'
})
export class PaidTypePipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    return PaidType[value];
  }
}
