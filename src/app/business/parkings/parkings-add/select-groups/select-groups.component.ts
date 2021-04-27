import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../core/global.service';
import {DataCacheService} from '../../../../core/data-cache.service';
import {HttpErrorEntity} from '../../../../core/http.service';
import {CanDeactivateComponent} from '../../../../share/interfaces/can-deactivate-component';
import {ParkingsHttpService} from '../../parkings-http.service';
import {GroupEntity, GroupsHttpService, GroupSearchParams} from '../../../groups/groups-http.service';
import {GlobalConst} from '../../../../share/global-const';
import {ParkingGroupsEntity} from "../../parkings.model";

@Component({
  selector: 'app-select-groups',
  templateUrl: './select-groups.component.html',
  styleUrls: ['../../parkings.component.css', '../parkings-add.component.css'],
  providers: [GroupsHttpService]
})

export class SelectGroupsComponent implements CanDeactivateComponent {

  public searchParams: GroupSearchParams = new GroupSearchParams();

  public groupsList: Array<GroupEntity> = [];

  public groupsInfo: ParkingGroupsEntity = new ParkingGroupsEntity();

  public parking_id: string;

  public groupsDirty = false;

  private editSuccess = false; // 编辑是否成功

  private isInit = true;

  private containerHeight: number; // 容器的高度

  private loadingFlag = true;

  private isLinkUrl = true; // 是否存在link

  private temSelectedGroupArr: Array<any> = [];

  private loadingTimerSubscription: Subscription;

  /**
   * 获取是否有分组被选中了(表单校验)
   * @returns {boolean}
   */
  public get checkedGroups(): boolean {
    if (this.temSelectedGroupArr.length > 0) {
      return true;
    }
    return false;
  }

  @ViewChild('createGroupsInfoForm') public createGroupsInfoForm: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataCacheService: DataCacheService,
              private parkingsHttpService: ParkingsHttpService,
              private groupsHttpService: GroupsHttpService,
              private globalService: GlobalService) {
    this.route.params.subscribe(params => {
      this.parking_id = params['parking_id'];
    });
    this.searchParams.page_num = 1;
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchParams.parking_group_types = '';
    this.requestGroupsData();
  }

  // 提交选择分组信息
  public onAddSelectGroupsFormSubmit() {
    this.groupsInfo.parking_group_ids = this.temSelectedGroupArr.join();

    this.parkingsHttpService.requestParkingGroupsData(this.groupsInfo, this.parking_id).subscribe(() => {
      this.globalService.promptBox.open('添加成功！', () => {
        this.editSuccess = true;
        this.dataCacheService.clear();
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 422) {
          const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

          for (const content of error.errors) {
            if (content.field === 'platform_id' && content.code === 'missing_field') {
              this.globalService.promptBox.open('收费系统id参数缺失！');
              return;
            } else if (content.field === 'platform_id' && content.code === 'invalid') {
              this.globalService.promptBox.open('收费系统id无效或不合法！');
              return;
            }
          }
        }
      }
    });
  }

  /* 容器div滚动事件 */
  public onScrollContainerScroll(event: any) {
    const target = event.target;
    this.containerHeight = $('.scroll-container').outerHeight();

    if (target.scrollTop + this.containerHeight >= target.scrollHeight / 2) {
      // 当滚动高度与容器高度之和超过总高度一半就开始加载新数据
      this.loadMoreData();
    }
  }

  private loadMoreData() {
    if (this.loadingFlag) {
      return;
    }
    this.loadingFlag = true;
    // 模拟1.5秒获取到数据
    this.loadingTimerSubscription && this.loadingTimerSubscription.unsubscribe();
    this.loadingTimerSubscription = Observable.timer(1500).subscribe(() => {
      if (this.isLinkUrl) {
        this.searchParams.page_num++;
        this.requestGroupsData();
      }
    });
  }

  // 修改选择分组
  public selectedGroups(event) {
    const park_type = this.temSelectedGroupArr;
    const index = park_type.indexOf(event.target.value);
    this.groupsDirty = true;
    if (index < 0) {
      if (event.target.checked) {
        this.temSelectedGroupArr.push(event.target.value);
      }
    } else {
      if (!event.target.checked) {
        this.temSelectedGroupArr.splice(index, 1);
      }
    }
  }

  // 请求组数据
  public requestGroupsData() {
    this.loadingFlag = true;
    this.loadingTimerSubscription && this.loadingTimerSubscription.unsubscribe();
    this.groupsHttpService.requestGroupsData(this.searchParams, false).subscribe(data => {
      this.loadingFlag = false;
      this.isLinkUrl = data.linkUrl ? true : false;
      if (data.results) {
        data.results.forEach(group => {
          this.groupsList.push(group);
        });
        if (this.isInit) {
          if (this.groupsList.length < 1) {
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.isInit = false;
          }
        }
      }
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  public canDeactivate(): boolean {
    return this.editSuccess || !this.createGroupsInfoForm || (!this.createGroupsInfoForm.dirty && !this.groupsDirty);
  }
}
