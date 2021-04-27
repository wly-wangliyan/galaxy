/**
 * Created by zack on 13/2/18.
 */
import {isNullOrUndefined} from 'util';

export class EChartSeriesDataItem {
  public name: any;
  public value: any;
  public label: any;
  public itemStyle: any;
  public emphasis: any;
  public tooltip: any;

  constructor(value?: any) {
    if (!isNullOrUndefined(value)) {
      this.value = value;
      this.name = value;
    }
  }
}
