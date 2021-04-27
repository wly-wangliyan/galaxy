import {Pipe, PipeTransform} from '@angular/core';

const valueObj = {
  '1': '异常中',
  '2': '已恢复',
};

@Pipe({
  name: 'exceptionsStatus'
})
export class ExceptionsStatusPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    return (valueObj[value] ? valueObj[value] : '');
  }
}
