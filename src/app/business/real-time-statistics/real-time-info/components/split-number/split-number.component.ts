import {Component, Input} from '@angular/core';
import {NumberToArray} from '../../../../../../utils/type-conversion';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-split-number',
  templateUrl: './split-number.component.html',
  styleUrls: ['./split-number.component.less']
})
export class SplitNumberComponent {

  public static intervalTime = 4; // 在5s内分4次滚动数字，每次滚动时间为1s

  @Input() public color = '#165cbb';

  @Input() public isLengthFixed = true; // 是否固定长度，如果固定，超过999，不超过补0

  @Input() public numberLength: number; // 固定方块个数

  @Input() public size: 'lg' | 'sm' = 'sm';

  @Input()
  public set splitNumber(value: number) {
    if (isNullOrUndefined(value)) {
      this.originNumber = 0;
    } else if (this.isLengthFixed && value.toString().length > this.numberLength) { // 如果固定长度并且超出固定长度
      this.originNumber = Math.pow(10, this.numberLength) - 1; // 生成临界数字，如999999
    } else {
      this.originNumber = value;
    }
    this.processOriginValue();
  }

  public numberList: Array<string>;

  private originNumber = 0; // 初始数字，未处理

  private lastNumber = 0; // 上次的数字

  private intervalSubscription: Subscription;

  private processOriginValue() {

    if (this.originNumber === 0 && this.lastNumber === 0) {
      // this.numberList = ['0'];
      this.numberList = this.generateNumberList(0);
      return;
    }

    const differenceValue = this.originNumber - this.lastNumber; // 本次与上次数字差
    if (differenceValue === 0) {
      return;
    }

    this.intervalSubscription && this.intervalSubscription.unsubscribe();

    const baseNumber = Math.floor(differenceValue / SplitNumberComponent.intervalTime); // 每次叠加的基础值
    const remainderCount = differenceValue % SplitNumberComponent.intervalTime; // 需要+1的数量

    const dealingNumberArray = []; // 数组
    for (let index = 0; index < SplitNumberComponent.intervalTime; index++) {
      if (index === 0) {
        const firstNumber = remainderCount === 0 ? this.lastNumber + baseNumber : this.lastNumber + baseNumber + 1;
        dealingNumberArray.push(firstNumber);
      } else if (index < remainderCount) {
        dealingNumberArray.push(dealingNumberArray[index - 1] + baseNumber + 1);
      } else {
        dealingNumberArray.push(dealingNumberArray[index - 1] + baseNumber);
      }
    }
    console.log(dealingNumberArray);
    this.numberList = this.generateNumberList(dealingNumberArray[0]);
    this.intervalSubscription = Observable.interval(1000).subscribe(index => {
      this.numberList = this.generateNumberList(dealingNumberArray[index + 1]);
      if (index === SplitNumberComponent.intervalTime - 2) {
        this.intervalSubscription.unsubscribe();
        this.lastNumber = this.originNumber;
      }
    });
  }

  private generateNumberList(value: number): Array<string> {
    if (isNullOrUndefined(value)) {
      return;
    }
    // 如果没有固定长度
    if (!this.isLengthFixed) {
      return NumberToArray(value);
    }
    // 如果固定了长度
    const numberList = new Array(this.numberLength).fill('0');
    const originNumberList = NumberToArray(value).reverse();
    numberList.forEach((num, index) => {
      if (originNumberList[index]) {
        numberList[this.numberLength - index - 1] = originNumberList[index];
      }
    });
    return numberList;
  }

}
