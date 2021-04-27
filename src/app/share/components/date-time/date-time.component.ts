import {
  Component, Output, Input, EventEmitter, HostListener, AfterViewInit, OnDestroy,
  OnChanges
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DateFormatHelper } from "../../../../utils/date-format-helper";

/* 参数说明:
 * startView: 0 起始选择范围，0为日，1为月，2为年。
 * maxViewMode: 4 最大选择范围 数字意义同第一个参数。
 * minViewMode: 0 最小选择范围 数字意义同第一个参数。
 * todayBtn:false 是否显示今日,默认不显示
 * yearBtn:是否显示整年,默认不显示 (修改源码自己添加)
 * changeWholeYear事件为修改源码自己添加
 * */
@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {

  @Input() public borderColor = '#eeeff5';
  @Input('timepickerOptions')
  public timepickerOptions: any = {};
  @Input('datepickerOptions')
  public datepickerOptions: any = {};
  @Input('hasClearButton')
  public hasClearButton = false;
  @Input('disableInput') // 禁用选择日期
  public disableInput = false;
  @Input('customDateValue')
  public customDateValue: any = '';
  @Input('placeholderValue')
  public placeholderValue = '年/月/日';

  @Input('customDateFormat')
  public customDateFormat = false; // 是否自定义日期部分的显示效果

  @Output()
  public dateChange = new EventEmitter();
  public date: Date; // ngModel
  public dateModel: string;
  public timeModel: string;

  // instances
  public datepicker: any;
  public timepicker: any;
  public idDatePicker: string = uniqueId('q-datepicker_');
  public idTimePicker: string = uniqueId('q-timepicker_');

  @HostListener('dateChange', ['$event'])
  public onChange = null;
  public onTouched = null;

  constructor(ngControl: NgControl) {
    ngControl.valueAccessor = this; // override valueAccessor
  }

  public onInputChange(event: any) {
    if (event.target.value === '') {
      this.dateChange.emit('');
    }
  }

  public ngAfterViewInit() {
    this.init();
  }

  public ngOnDestroy() {
    if (this.datepicker) {
      this.datepicker.datepicker('destroy');
    }
    if (this.timepicker) {
      this.timepicker.timepicker('remove');
    }
  }

  public ngOnChanges(changes) {

    if (changes) {
      if (changes['datepickerOptions'] && this.datepicker) {
        this.datepicker.off('changeDate');
        this.datepicker.off('changeWholeYear');
        this.datepicker.datepicker('destroy');

        if (changes['datepickerOptions'].currentValue) {
          this.datepicker = null;
          this.init();
        } else if (changes['datepickerOptions'].currentValue === false) {
          this.datepicker.remove();
        }
      }
      if (changes['timepickerOptions'] && this.timepicker) {
        this.timepicker.timepicker('remove');

        if (changes['timepickerOptions'].currentValue) {
          this.timepicker = null;
          this.init();
        } else if (changes['timepickerOptions'].currentValue === false) {
          this.timepicker.parent().remove();
        }
      }
    }
  }

  public writeValue(value: any): void {
    this.date = value;
    if (isDate(this.date)) {
      setTimeout(() => {
        this.updateModel(this.date);
      }, 0);
    }
    /* 当赋空时清空显示内容 by zwl 2017.5.22 */
    if (value === '') {
      setTimeout(() => {
        if (this.timepicker) {
          this.timepicker.timepicker('setTime', null);
        }
        if (this.datepicker) {
          this.datepicker.datepicker('update', null);
        }
      }, 0);
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public checkEmptyValue(e) {
    const value = e.target.value;
    if (value === '' && (
      this.timepickerOptions === false ||
      this.datepickerOptions === false ||
      (this.timeModel === '' && this.dateModel === '')
    )) {
      this.dateChange.emit(null);
    }
  }

  public onClearClick() {
    this.dateChange.emit(null);
    if (this.timepicker) {
      this.timepicker.timepicker('setTime', null);
    }
    if (this.datepicker) {
      this.datepicker.datepicker('update', null);
    }
  }

  //////////////////////////////////

  private init(): void {
    if (!this.datepicker && this.datepickerOptions !== false) {
      this.datepicker = (<any>$('#' + this.idDatePicker)).datepicker(this.datepickerOptions);
      this.datepicker
        .on('changeDate', (e) => {
          const newDate: Date = e.date;
          if (isDate(this.date) && isDate(newDate)) {
            // get hours/minutes
            const h = this.date.getHours();
            const m = this.date.getMinutes();
            newDate.setHours(h);
            newDate.setMinutes(m);
          }
          this.date = newDate;
          this.dateChange.emit(newDate);
        });
      this.datepicker.on('changeWholeYear', (e) => {
        const newDate: Date = new Date(e.date.getFullYear(), 0, 1);
        this.date = newDate;
        this.dateChange.emit(newDate);
      });
    } else if (this.datepickerOptions === false) {
      (<any>$('#' + this.idDatePicker)).remove();
    }

    if (!this.timepicker && this.timepickerOptions !== false) {
      const options = $.extend({ defaultTime: false }, this.timepickerOptions);
      this.timepicker = (<any>$('#' + this.idTimePicker)).timepicker(options);
      this.timepicker
        .on('changeTime.timepicker', (e) => {
          const meridian = e.time.meridian;
          let hours = e.time.hours;
          if (meridian) {
            // has meridian -> convert 12 to 24h
            if (meridian === 'PM' && hours < 12) {
              hours = hours + 12;
            }
            if (meridian === 'AM' && hours === 12) {
              hours = hours - 12;
            }
            hours = this.pad(hours);
          }
          if (!isDate(this.date)) {
            this.date = new Date();

            if (this.datepicker !== undefined) {
              this.datepicker.datepicker('update', this.date);
            }
          }
          this.date.setHours(parseInt(hours, null));
          this.date.setMinutes(e.time.minutes);
          this.dateChange.emit(this.date);
        });
    } else if (this.timepickerOptions === false) {
      (<any>$('#' + this.idTimePicker)).parent().remove();
    }
  }

  private updateModel(date?: Date): void {
    // update datepicker
    if (this.datepicker !== undefined) {
      this.datepicker.datepicker('update', this.date);
      // 当自定义日期模式时更新值
      if (this.customDateFormat) {
        this.customDateValue = DateFormatHelper.Format(this.date, 'yyyy/MM/dd');
      }
    }

    // update timepicker
    if (this.timepicker !== undefined) {
      let hours = this.date.getHours();
      if (this.timepickerOptions.showMeridian) {
        // Convert 24 to 12 hour system
        hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
      }
      // const meridian = this.date.getHours() >= 12 ? ' PM' : ' AM';
      const time = parseInt(this.pad(hours), null) + ':' + this.pad(this.date.getMinutes());
      this.timepicker.timepicker('setTime', time);
      this.timeModel = time; // fix initial empty timeModel bug
    }
  }

  private pad(value: any): string {
    let val = value;
    if (val < 10 && val >= 0) {
      val = '0' + val;
    }
    return val;
  }
}

let id = 0;

function uniqueId(prefix: string): string {
  return prefix + ++id;
}

function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
