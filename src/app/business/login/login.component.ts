import {Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {LoginHttpService} from './login-http.service';
import {AuthService} from '../../core/auth.service';
import {SpecialKeyCode} from '../../../utils/keyboard-helper';
import {LocalStorageProvider} from '../../share/localstorage-provider';
import {isUndefined} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginHttpService]
})
export class LoginComponent {

  @ViewChild('userIcon') public userIcon: ElementRef;
  @ViewChild('pwdIcon') public pwdIcon: ElementRef;
  @ViewChild('userInput') public userInput: ElementRef;
  @ViewChild('pwdInput') public pwdInput: ElementRef;

  private isUserIconFocus = false;
  private isPwdIconFocus = false;

  public isWrongInput = false;
  public wrongMessage = '*用户名或者密码错误，请重新输入！';
  public userName = '';
  public password = '';

  constructor(private renderer2: Renderer2,
              private loginHttpService: LoginHttpService,
              private authService: AuthService) {
    this.userName = LocalStorageProvider.Instance.get(LocalStorageProvider.HistoryLoginName);
  }

  /**** 控件显示效果 ****/

  public onUserMouseEnter() {
    this.renderer2.addClass(this.userIcon.nativeElement, 'user-icon-focus');
    this.renderer2.addClass(this.userInput.nativeElement, 'input-focus');
  }

  public onUserMouseLeave() {
    if (this.isUserIconFocus) {
      return;
    }
    this.renderer2.removeClass(this.userIcon.nativeElement, 'user-icon-focus');
    this.renderer2.removeClass(this.userInput.nativeElement, 'input-focus');
  }

  public onUserFocus() {
    this.isUserIconFocus = true;
    this.renderer2.addClass(this.userIcon.nativeElement, 'user-icon-focus');
    this.renderer2.addClass(this.userInput.nativeElement, 'input-focus');
  }

  public onUserBlur() {
    this.isUserIconFocus = false;
    this.renderer2.removeClass(this.userIcon.nativeElement, 'user-icon-focus');
    this.renderer2.removeClass(this.userInput.nativeElement, 'input-focus');
  }

  public onPwdMouseEnter() {
    this.renderer2.addClass(this.pwdIcon.nativeElement, 'pwd-icon-focus');
    this.renderer2.addClass(this.pwdInput.nativeElement, 'input-focus');
  }

  public onPwdMouseLeave() {
    if (this.isPwdIconFocus) {
      return;
    }
    this.renderer2.removeClass(this.pwdIcon.nativeElement, 'pwd-icon-focus');
    this.renderer2.removeClass(this.pwdInput.nativeElement, 'input-focus');
  }

  public onPwdFocus() {
    this.isPwdIconFocus = true;
    this.renderer2.addClass(this.pwdIcon.nativeElement, 'pwd-icon-focus');
    this.renderer2.addClass(this.pwdInput.nativeElement, 'input-focus');
  }

  public onPwdBlur() {
    this.isPwdIconFocus = false;
    this.renderer2.removeClass(this.pwdIcon.nativeElement, 'pwd-icon-focus');
    this.renderer2.removeClass(this.pwdInput.nativeElement, 'input-focus');
  }

  public onPwdKeyDown(event: any) {
    if (event.keyCode === SpecialKeyCode.Enter) {
      this.onLoginBtnClick();
    }
  }

  public onLoginBtnClick() {
    if (isNullOrUndefined(this.userName) ||
      isNullOrUndefined(this.password) ||
      this.userName.trim().length === 0 ||
      this.password.trim().length === 0) {
      this.isWrongInput = true;
      return;
    }
    this.isWrongInput = false;
    this.loginHttpService.requestLogin(this.userName, this.password).subscribe(data => {
      // 判断角色是否为平台用户
      if (isUndefined(data.role) || data.role === 1) {
        // 登录成功记住用户名
        LocalStorageProvider.Instance.set(LocalStorageProvider.HistoryLoginName, this.userName);
        this.authService.authorizeByLogin();
      } else {
        this.wrongMessage = '*该账号无权限，请联系管理员开通权限后再登录！';
        this.isWrongInput = true;
      }
    }, () => {
      this.wrongMessage = '*用户名或者密码错误，请重新输入！';
      this.isWrongInput = true;
    });
  }
}
