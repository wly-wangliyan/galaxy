import {Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy} from '@angular/core';
import {PromptBoxComponent} from './share/components/prompts/prompt-box/prompt-box.component';
import {GlobalService} from './core/global.service';
import {ConfirmationBoxComponent} from './share/components/prompts/confirmation-box/confirmation-box.component';
import {Http403PageComponent} from './share/components/prompts/http-403-page/http-403-page.component';
import {Http500PageComponent} from './share/components/prompts/http-500-page/http-500-page.component';
import {AuthService} from './core/auth.service';
import {ValidateHelper} from '../utils/validate-helper';
import {LoginHttpService} from './business/login/login-http.service';
import {HttpErrorEntity} from './core/http.service';
import {RouteMonitorService} from './core/route-monitor.service';
import {DateFormatHelper} from '../utils/date-format-helper';
import {Http502PageComponent} from './share/components/prompts/http-502-page/http-502-page.component';
import {initializer} from '../initializer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginHttpService]
})
export class AppComponent implements AfterViewInit {

  @ViewChild(PromptBoxComponent) public globalPromptBox: PromptBoxComponent;
  @ViewChild(ConfirmationBoxComponent) public globalConfirmationBox: ConfirmationBoxComponent;
  @ViewChild(Http403PageComponent) public global403Page: Http403PageComponent;
  @ViewChild(Http500PageComponent) public global500Page: Http500PageComponent;
  @ViewChild(Http502PageComponent) public global502Page: Http502PageComponent;
  @ViewChild('routerDiv') public routerDiv: ElementRef;

  public old_password: string;
  public new_password: string;
  public repeat_password: string;

  constructor(private globalService: GlobalService,
              private renderer2: Renderer2,
              public authService: AuthService,
              private routeService: RouteMonitorService,
              private loginHttpService: LoginHttpService,
              ) {
    DateFormatHelper.NowBlock = () => {
      return new Date(globalService.timeStamp * 1000);
    };
  }

  public ngAfterViewInit() {
    this.globalService.promptBox = this.globalPromptBox;
    this.globalService.confirmationBox = this.globalConfirmationBox;
    this.globalService.http403Page = this.global403Page;
    this.globalService.http500Page = this.global500Page;
    this.globalService.http502Page = this.global502Page;
    GlobalService.Instance = this.globalService;

    switch (initializer.statusCode) {
      case 403:
        this.global403Page.http403Flag = true;
        break;
      case 500:
        this.global500Page.http500Flag = true;
        break;
      case 502:
        this.global502Page.http502Flag = true;
        break;
    }
    this.routeService.routePathChanged.subscribe(() => {
      // 到路由变更时重置显示状态
      this.global403Page.http403Flag = false;
      this.global500Page.http500Flag = false;
      this.global502Page.http502Flag = false;
    });
  }

  public displayStateChanged(): void {
    if (this.global403Page.http403Flag || this.global500Page.http500Flag || this.global502Page.http502Flag) {
      this.renderer2.setStyle(this.routerDiv.nativeElement, 'display', 'none');
    } else {
      this.renderer2.setStyle(this.routerDiv.nativeElement, 'display', 'block');
    }
  };

  public onLogoutDivClick() {
    this.globalService.confirmationBox.open('是否退出系统？', () => {
      this.authService.logout();
    });
  }

  public onModifyPwdDivClick() {
    this.old_password = '';
    this.new_password = '';
    this.repeat_password = '';
  }

  public onModifyPwdFormSubmit() {
    if (!ValidateHelper.Length(this.old_password, 8, 20)) {
      this.globalService.promptBox.open('旧密码必须为8-20位！');
      return;
    } else if (!ValidateHelper.Length(this.new_password, 8, 20)) {
      this.globalService.promptBox.open('新密码必须为8-20位！');
      return;
    } else if (!ValidateHelper.Length(this.repeat_password, 8, 20)) {
      this.globalService.promptBox.open('确认新密码必须为8-20位！');
      return;
    } else if (this.new_password !== this.repeat_password) {
      this.globalService.promptBox.open('两次密码不一致，请重新输入！');
      return;
    } else if (this.old_password === this.new_password) {
      this.globalService.promptBox.open('新旧密码不可相同！');
    } else {
      this.loginHttpService.requestModifyPassword(this.old_password, this.new_password).subscribe(() => {
        this.globalService.promptBox.open('密码修改成功,请重新登录！', () => {
          $('#modifyPasswordModal').modal('hide');
          this.authService.kickOut();
        });
        return;
      }, err => {
        if (!this.globalService.httpErrorProcess(err)) {
          if (err.status === 422) {
            const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

            for (const content of error.errors) {
              if (content.field === 'old_password' && content.code === 'invalid') {
                this.globalService.promptBox.open('旧密码输入不正确！');
                return;
              } else if (content.field === 'password' && content.code === 'invalid') {
                this.globalService.promptBox.open('新旧密码不可相同！');
              }
            }
          }
        }
      });
    }
  }
}
