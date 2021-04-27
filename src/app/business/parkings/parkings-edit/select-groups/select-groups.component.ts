import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../core/global.service';
import {DataCacheService} from '../../../../core/data-cache.service';
import {HttpErrorEntity} from '../../../../core/http.service';
import {CanDeactivateComponent} from '../../../../share/interfaces/can-deactivate-component';
import {ParkingsHttpService} from '../../parkings-http.service';
import {GroupEntity, GroupsHttpService, GroupSearchParams} from '../../../groups/groups-http.service';
import {GlobalConst} from '../../../../share/global-const';
import {ParkingGroupsEntity} from '../../parkings.model';
import {CheckboxState} from "../../../../share/components/beautify-checkbox/beautify-checkbox.component";

@Component({
  selector: 'app-select-groups',
  templateUrl: './select-groups.component.html',
  styleUrls: ['../../parkings.component.css', '../parkings-edit.component.css'],
  providers: [GroupsHttpService]
})

export class EditSelectGroupsComponent implements CanDeactivateComponent {

  public searchParams: GroupSearchParams = new GroupSearchParams();

  public groupsList: Array<GroupEntity> = [];

  public groupsInfo: ParkingGroupsEntity = new ParkingGroupsEntity();

  public parking_id: string;

  public groupsDirty = false;

  private editSuccess = false; // 编辑是否成功

  public isEdit = true; // 是否修改

  private containerHeight: number; // 容器的高度

  private loadingFlag = true;

  private isLinkUrl = true; // 是否存在link

  private temSelectedGroupArr: Array<any> = [];

  private loadingTimerSubscription: Subscription;

  @ViewChild('createGroupsInfoForm') public createGroupsInfoForm: any;

  constructor(private route: ActivatedRoute,
              private dataCacheService: DataCacheService,
              private parkingsHttpService: ParkingsHttpService,
              private groupsHttpService: GroupsHttpService,
              private globalService: GlobalService) {
    this.route.parent.params.subscribe(params => {
      this.parking_id = params['parking_id'];
    });
    this.searchParams.page_num = 1;
    this.searchParams.page_size = GlobalConst.PageSize;
    this.searchParams.parking_group_types = '';
    this.requestGroupsData();
  }

  // 查找指定停车场信息
  public requestParkingByIdData() {
    this.temSelectedGroupArr = [];

    this.parkingsHttpService.requestParkingsByIdData(this.parking_id).subscribe(data => {
      if (data.parking_groups.length > 0) {
        data.parking_groups.forEach(group => {
          this.temSelectedGroupArr.push(group.parking_group_id);
        });
      }
      // this.groupsList.forEach(group => {
      //   data.parking_groups.forEach(selectedGroup => {
      //     if (selectedGroup.parking_group_id === group.parking_group_id) {
      //       $('#' + group.parking_group_id).prop('checked', true);
      //     }
      //   });
      // });
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 404) {
          this.globalService.promptBox.open('请求地址错误！');
          return;
        }
      }
    });
  }

  // 提交选择分组信息
  public onAddSelectGroupsFormSubmit() {
    this.groupsInfo.parking_group_ids = this.temSelectedGroupArr.join();

    this.parkingsHttpService.requestParkingGroupsData(this.groupsInfo, this.parking_id).subscribe(() => {
      this.globalService.promptBox.open('编辑成功！', () => {
        this.isEdit = true;
        this.editSuccess = true;
        this.dataCacheService.clear();
        this.searchParams.page_num = 1;
        this.groupsList = [];
        this.requestGroupsData();
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
    const index = park_type.indexOf(event[1].parking_group_id);
    this.groupsDirty = true;
    if (index < 0) {
      if (event[0] === CheckboxState.checked) {
        this.temSelectedGroupArr.push(event[1].parking_group_id);
      }
    } else {
      if (event[0] === CheckboxState.unchecked) {
        this.temSelectedGroupArr.splice(index, 1);
      }
    }
  }

  // 请求组数据
  public requestGroupsData(clearData: boolean = false) {
    this.groupsDirty = false;
    this.isEdit = true;
    this.loadingFlag = true;
    this.loadingTimerSubscription && this.loadingTimerSubscription.unsubscribe();

    this.groupsHttpService.requestGroupsData(this.searchParams, false).subscribe(data => {
      this.loadingFlag = false;
      this.isLinkUrl = data.linkUrl ? true : false;
      if (data.results) {
        if (clearData) {
          this.groupsList = [];
        }
        data.results.forEach(group => {
          this.groupsList.push(group);
        });
        this.requestParkingByIdData();
      }
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
  }

  public canDeactivate(): boolean {
    return this.editSuccess || !this.createGroupsInfoForm || (!this.createGroupsInfoForm.dirty && !this.groupsDirty);
  }
}
