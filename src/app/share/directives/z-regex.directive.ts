import {Directive, HostListener, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';

@Directive({
  selector: '[appZRegex][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: ZRegexDirective, multi: true}
  ]
})
export class ZRegexDirective implements Validator {

  /**
   * 预设值
   */
  private presetRegexDict = {
    0: /^(0|[1-9][0-9]{0,4})$/g, // 0-99999数字
    1: /^(0|[1-9][0-9]{0,4})(\.\d{0,2})?$/g, // 可以保留两位小数的数字0-99999.99
    2: /^(0|[1-9][0-9]{0,4})(\.\d?)?$/g, // 可以保留一位小数的数字0-99999.9
  };

  /* 选择正则类型 */
  @Input('zRegexIndex') public zRegexIndex = '0';

  private get regex(): RegExp {
    return this.presetRegexDict[this.zRegexIndex];
  }

  public validate(c: AbstractControl): {[p: string]: any} {
    this.regex.lastIndex = 0;
    if (!this.regex.test(c.value) && (c.value != null && c.value !== '')) {
      // 重置输入信息,处理中文输入的情况
      c.reset();
    }
    return null;
  }

  /* 处理按下事件 */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: any) {

    const keyCode = event.which;

    if (keyCode === SpecialKeyCode.SpaceBar) {
      // 忽略空格
      event.preventDefault();
    }

    for (const key in SpecialKeyCode) {
      if (key === keyCode) {
        // 特殊输入略过即可
        return;
      }
    }

    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    const preValue = event.target.value;
    const newValue = preValue.substring(0, start) + event.key + preValue.substring(end);
    // 重置匹配索引
    this.regex.lastIndex = 0;
    if (!this.regex.test(newValue)) {
      // 新值无效，则阻止此次输入
      event.preventDefault();
    }
  }
}

enum SpecialKeyCode {
  Enter = 13,
  UpArrow = 38,
  DownArrow = 40,
  LeftArrow = 37,
  RightArrow = 39,
  Escape = 27,
  SpaceBar = 32,
  Ctrl = 17,
  Alt = 18,
  Tab = 9,
  Shift = 16,
  CapsLock = 20,
  WindowsKey = 91,
  WindowsOptionKey = 93,
  Backspace = 8,
  Home = 36,
  End = 35,
  Insert = 45,
  Delete = 46,
  PageUp = 33,
  PageDown = 34,
  NumLock = 144,
  PrintScreen = 44,
  ScrollLock = 145,
  PauseBreak = 19,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
}
