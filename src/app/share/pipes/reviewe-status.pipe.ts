import {Pipe, PipeTransform} from '@angular/core';

const revieweStatus = {
  1: '待审核',
  2: '未通过',
  3: '已放弃',
  4: '已通过',
  5: '已失效',
  6: '已过期'
};

/**
 * 审核状态
 */
@Pipe({
  name: 'revieweStatus'
})
export class RevieweStatusPipe implements PipeTransform {

  public transform(value: any, args?: any): string {
    return revieweStatus[value];
  }

}
