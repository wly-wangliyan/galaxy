/**
 * Created by zack on 22/5/17.
 */
import {Component, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {DateFormatHelper} from '../../../../utils/date-format-helper';

@Component({
  selector: 'app-date-time-ymdhms',
  templateUrl: './date-time-YMDHMS.component.html',
  styleUrls: ['./date-time-YMDHMS.component.css'],
})
export class DateTimeYMDHMSComponent implements ControlValueAccessor {

  public dateTimeDate: any = '';
  public dateTimeTime: any = new Date(new Date().getFullYear() + ' 0:0');

  @Input() public borderColor: string;

  @Output()
  public dateTimeChange = new EventEmitter();

  public dateTime: Date; // ngModel

  @Input()
  public dateOptions: any = {
    startDate: new Date('2000/01/01'),
    endDate: new Date('9999/12/31'),
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'yyyy/mm/dd',
    language: 'zh-CN',
  };

  @HostListener('dateTimeChange', ['$event'])
  public onChange = null;
  public onTouched = null;

  @Input('disableInput') // 禁用选择日期
  public disableInput = false;

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this; // override valueAccessor
  }

  public onDateTimeDateChanged() {
    setTimeout(() => {
      // 当选择的时间发生变化时更新,output时间
      if (this.dateTimeDate === '' || this.dateTimeDate == null) {
        // 没有通过控件设置空的方法,只能通过赋值
        this.dateTimeTime = new Date(new Date().getFullYear() + ' 0:0');
        this.dateTimeChange.emit('');
        return;
      }
      this.dateTime = new Date(
        DateFormatHelper.Format(this.dateTimeDate, 'yyyy/MM/dd') + ' ' +
        DateFormatHelper.Format(this.dateTimeTime, 'hh:mm:ss'));
      this.dateTimeChange.emit(this.dateTime);
    }, 0);
  }

  public onDateTimeTimeChanged() {
    setTimeout(() => {
      // 当选择的时间发生变化时更新,output时间
      if (this.dateTimeTime === '' || this.dateTimeTime == null) {
        // 没有通过控件设置空的方法,只能通过赋值
        this.dateTimeTime = new Date(new Date().getFullYear() + ' 0:0');
      }
      if (this.dateTimeDate === '' || this.dateTimeDate == null) {
        // 没有通过控件设置空的方法,只能通过赋值
        this.dateTimeChange.emit('');
        return;
      }
      this.dateTime = new Date(
        DateFormatHelper.Format(this.dateTimeDate, 'yyyy/MM/dd') + ' ' +
        DateFormatHelper.Format(this.dateTimeTime, 'hh:mm:ss'));
      this.dateTimeChange.emit(this.dateTime);
    }, 0);
  }

  public writeValue(value: any): void {
    this.dateTime = value;
    if (this.isDate(this.dateTime)) {
      setTimeout(() => {
        // input时间
        this.dateTimeDate = this.dateTime;
        this.dateTimeTime = this.dateTime;
      }, 0);
    }

    // 赋值''时清空
    if (value === '') {
      this.dateTimeDate = '';
      this.dateTimeTime = new Date(new Date().getFullYear() + ' 0:0');
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public isDate(obj) {
    return (Object.prototype.toString.call(obj) === '[object Date]') && (obj.toString() !== 'Invalid Date');
  }
}
