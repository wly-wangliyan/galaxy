import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ValidateHelper} from '../../../../utils/validate-helper';
import {GlobalService} from '../../../core/global.service';
import {HttpErrorEntity} from '../../../core/http.service';
import { ExceptionsHttpService, SendSettingStatue, SendUserListEntity } from '../exceptions-http.service';
import { SearchAssistant } from '../../../share/search-assistant';

@Component({
  selector: 'app-push-settings',
  templateUrl: './push-settings.component.html',
  styleUrls: ['./push-settings.component.css']
})
export class PushSettingsComponent implements OnInit {

  public sendUserList: Array<SendUserListEntity> = [];

  public currentSendUser = new SendUserListEntity();

  public sendSettingStatue = new SendSettingStatue();

  public searchAssistant: SearchAssistant;

  public isComplete = false;

  public isAdd = true;

  public isOpenedDisable = false;

  constructor(private exceptionsHttpService: ExceptionsHttpService,
              private globalService: GlobalService) {
  }

  public ngOnInit() {
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
    /**
     * 并发获取推送状态
     */
    Observable.forkJoin([
      this.exceptionsHttpService.requestSendSettingStatueData()]).subscribe(result => {
      this.isComplete = true;
      this.sendSettingStatue = result[0];
    });
  }

  // 马上开启按钮
  public onOpenImmediatelyBtn() {
    if (this.sendUserList.length >= 50) {
      this.globalService.promptBox.open('最多添加50个邮箱!');
      return;
    }
    this.isOpenedDisable = true;
    if (this.sendUserList.length === 0) {
      this.currentSendUser = new SendUserListEntity();

      Observable.timer().subscribe(() => {
        $('#addPushModal').modal('show');
      });
      return;
    }
    this.sendSettingStatue.status = true;
    Observable.timer().subscribe(() => {
      this.requestModifySendSettingStatue();
    });
  }

  // 修改推送状态下拉框
  public changePushSetting(event: any) {
    if (event.target.value === 'false') {
      this.globalService.confirmationBox.open('推送通知关闭后将不再推送邮件，是否关闭？', () => {
        this.globalService.confirmationBox.close();
        Observable.timer().subscribe(() => {
          this.closeSendSetting();
        });
      }, '确定', () => {
        this.sendSettingStatue.status = true;
      });
    }
  }

  // 打开添加/编辑模态框
  public onAddOrEditPushModalBtn(isAdd: boolean = true, sendUser?: SendUserListEntity) {
    this.isAdd = isAdd;
    if (isAdd) {
      this.currentSendUser = new SendUserListEntity();
    } else {
      this.currentSendUser = new SendUserListEntity(sendUser);
    }

    Observable.timer().subscribe(() => {
      $('#addPushModal').modal('show');
    });
  }

  // 提交添加/编辑推送设置数据
  public onAddOrEditPushSubmit() {
    if (!ValidateHelper.Email(this.currentSendUser.email)) {
      this.globalService.promptBox.open('邮箱格式错误，请重新输入。');
    } else {
      const processSuccessMsg = () => {
        $('#addPushModal').modal('hide');
        this.globalService.promptBox.open('保存成功！', () => {
          if (this.sendUserList.length === 0) {
            this.sendSettingStatue.status = true;
            Observable.timer().subscribe(() => {
              this.requestModifySendSettingStatue();
            });
          }
          this.requestSendUsers();
        });
      };
      const processErrorMsg = (err: any) => {
        if (!this.globalService.httpErrorProcess(err)) {
          if (err.status === 422) {
            const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

            for (const content of error.errors) {
              if (content.field === 'name' && content.code === 'invalid') {
                this.globalService.promptBox.open('该姓名无效，请重新输入！');
              } else if (content.field === 'email' && content.code === 'invalid') {
                this.globalService.promptBox.open('该邮箱无效，请重新输入！');
              } else if (content.resource === 'email' && content.code === 'already_exist') {
                this.globalService.promptBox.open('该邮箱已存在！');
              } else if (content.resource === 'abnormal_receiver' && content.code === 'more_than_maximum') {
                this.globalService.promptBox.open('邮箱数量超出范围！');
              }
            }
          }
        }
      };

      if (this.isAdd) {
        // 添加收件人信息
        this.exceptionsHttpService.requestAddSendUserData(this.currentSendUser).subscribe(() => {
          processSuccessMsg();
        }, err => {
          processErrorMsg(err);
        });
      } else {
        // 修改收件人信息
        this.exceptionsHttpService.requestModifySendUserData(this.currentSendUser, this.currentSendUser.abnormal_receiver_id).subscribe(() => {
          processSuccessMsg();
        }, err => {
          processErrorMsg(err);
        });
      }
    }
  }

  // 取消按钮
  public onInverseBtn() {
    if (this.sendUserList.length > 0) {
      $('#addPushModal').modal('hide');
      return;
    }
    this.globalService.confirmationBox.open('取消新建后将关闭推送，是否确认取消？', () => {
      this.globalService.confirmationBox.close();

      Observable.timer(150).subscribe(() => {
        $('#addPushModal').modal('hide');
        this.closeSendSetting();
      });
    });
  }

  // 删除
  public onDeleteBtn(send_user_id) {
    const msgContent = (this.sendUserList.length === 1 && this.searchAssistant.currentPage === 1) ? '邮箱删除后将关闭推送，是否确认取消？' : '删除后无法恢复，是否确认删除？';
    this.globalService.confirmationBox.open(msgContent, () => {
      this.globalService.confirmationBox.close();
      this.exceptionsHttpService.requestDeleteSendUserData(send_user_id).subscribe(() => {
        this.requestSendUsers();
        if (this.sendUserList.length === 1 && this.searchAssistant.currentPage === 1) {
          this.closeSendSetting();
        }
      });
    });
  }

  // 获取收件人信息列表
  private requestSendUsers() {
    this.searchAssistant.submitSearch(false);
  }

  // 修改推送状态
  private requestModifySendSettingStatue() {
    this.exceptionsHttpService.requestModifySendSettingStatueData(this.sendSettingStatue).subscribe(() => {
      console.log('成功修改推送状态！');
    });
  }

  // 关闭推送设置
  private closeSendSetting() {
    this.isOpenedDisable = false;
    this.sendSettingStatue.status = false;

    Observable.timer().subscribe(() => {
      this.requestModifySendSettingStatue();
    });
  }

  /* SearchAdapter 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    return this.exceptionsHttpService.requestSendUsersData();
  }

  public continueSearch(url: string): any {
    return this.exceptionsHttpService.continueSendUsersList(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    return true;
  }

  /* 检索失败处理 */
  public searchErrProcess(err: any) {
    this.globalService.httpErrorProcess(err);
  }

  /* 检索成功处理 */
  public searchCompleteProcess(results: Array<any>, isFuzzySearch: boolean) {
    if (results.length === 0 && !isFuzzySearch) {
      // 精确查询时需要弹出提示
      this.globalService.promptBox.open('暂未查询到数据！');
    }
    // 获取当前页面数据
    this.sendUserList = results;
  }
}
