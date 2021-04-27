import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  ParkingRecordsHttpService, SearchParkingRecordParams,
  ParkingRecordEntity, ExportParkingRecordParams
} from './parking-records.http.service';
import {GlobalService} from '../../../core/global.service';
import {SearchAssistant, SearchAdapter} from '../../../share/search-assistant';
import {DefaultUserType} from '../../../share/pipes/user-type.pipe';
import {DateFormatHelper} from '../../../../utils/date-format-helper';
import {ParkingsHttpService} from '../../parkings/parkings-http.service';
import {ParkingEntity, ParkingsSearchParams} from '../../parkings/parkings.model';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/auth.service';
import {isNullOrUndefined} from "util";
import {InputSelectorComponent} from "../../../share/components/input-selector/input-selector.component";
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-parking-records',
  templateUrl: './parking-records.component.html',
  styleUrls: ['./parking-records.component.css'],
  providers: [ParkingRecordsHttpService]
})
export class ParkingRecordsComponent implements SearchAdapter, OnInit {

  public searchParams: SearchParkingRecordParams = new SearchParkingRecordParams();
  public exportParams: ExportParkingRecordParams = new ExportParkingRecordParams();
  public searchParkParams: ParkingsSearchParams = new ParkingsSearchParams();

  public searchAssistant: SearchAssistant;

  public parkingRecordList: Array<ParkingRecordEntity> = [];

  public selectParkingRecord: ParkingRecordEntity;

  public defaultUserType = DefaultUserType;

  public entrance_start_date: any = '';
  public entrance_end_date: any = '';

  public exit_start_date: any = '';
  public exit_end_date: any = '';

  // public export_entrance_start_dateDate: Date;
  // public export_entrance_end_dateDate: Date;

  public export_entrance_start_date: Date;
  public export_entrance_end_date: Date;

  public export_exit_start_date: any = '';
  public export_exit_end_date: any = '';

  public parkList: Array<ParkingEntity> = [];
  public parkLists = [];
  public export_hidden = false;

  public datePickerDefaultOptions: any = {
    startDate: new Date('2000/01/01'),
    endDate: DateFormatHelper.Today,
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'yyyy/mm/dd',
    language: 'zh-CN',
  };

  public isLoadComplete = false; // 数据是否加载完成

  @ViewChild('export') public export: ElementRef;
  @ViewChild(InputSelectorComponent) public inputSelectorComponent: InputSelectorComponent

  constructor(private parkingRecordsHttpService: ParkingRecordsHttpService, private globalService: GlobalService, private parkingService: ParkingsHttpService,
              private authService: AuthService) {
    this.searchAssistant = new SearchAssistant(this);
    this.searchAssistant.submitSearch(true);
    this.selectParkingRecord = new ParkingRecordEntity();
    this.export_entrance_end_date = DateFormatHelper.Today;
    this.export_entrance_start_date = DateFormatHelper.AWeekAgo;
  }

  public ngOnInit() {
    this.parkingService.requestAllParkingData().subscribe(data => {
      this.parkList = data;
    });
    if (this.authService.user.is_superuser) {
      this.export_hidden = true;
    } else {
      for (const permission of this.authService.user.permission_groups) {
        if (permission.english_name === 'parking_record_export') {
          this.export_hidden = true;
        }
      }
    }
  }

  public onSelected(parkingRecord: ParkingRecordEntity) {
    this.selectParkingRecord = parkingRecord;
  }

  public onSelectPark(event) {
    if (isNullOrUndefined(event)) {
      this.exportParams.parking_name = '';
      return;
    }
    if (event.parking_name === '') {
      this.globalService.promptBox.open('请选择停车场');
      return;
    } else {
      this.exportParams.parking_name = event.parking_name;
    }
  }

  /* SearchDecorator 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.parkingRecordsHttpService.requestParkingRecordsData(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.parkingRecordsHttpService.continueParkingRecordsData(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    if (this.entrance_start_date && this.entrance_end_date) {
      const sTimestamp = this.entrance_start_date.getTime() / 1000;
      const eTimeStamp = this.entrance_end_date.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('入场开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      this.searchParams.entry_section = sTimestamp + ',' + eTimeStamp;
    } else if (!this.entrance_start_date && this.entrance_end_date) {
      const eTimeStamp = this.entrance_end_date.getTime() / 1000;
      this.searchParams.entry_section = '0,' + eTimeStamp;
    } else if (this.entrance_start_date && !this.entrance_end_date) {
      const sTimestamp = this.entrance_start_date.getTime() / 1000;
      this.searchParams.entry_section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
    } else {
      this.searchParams.entry_section = null;
    }

    if (this.exit_start_date && this.exit_end_date) {
      const sTimestamp = this.exit_start_date.getTime() / 1000;
      const eTimeStamp = this.exit_end_date.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('出场开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      this.searchParams.exit_section = sTimestamp + ',' + eTimeStamp;
    } else if (!this.exit_start_date && this.exit_end_date) {
      const eTimeStamp = this.exit_end_date.getTime() / 1000;
      this.searchParams.exit_section = '0,' + eTimeStamp;
    } else if (this.exit_start_date && !this.exit_end_date) {
      const sTimestamp = this.exit_start_date.getTime() / 1000;
      this.searchParams.exit_section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
    } else {
      this.searchParams.exit_section = null;
    }
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

    this.parkingRecordList = results;
    this.isLoadComplete = true;
  }

  /*导出停车记录模态框*/
  public onParkRecordExport() {
    this.inputSelectorComponent.clear();
    this.exportParams = new ExportParkingRecordParams();
    this.export_exit_start_date = '';
    this.export_exit_end_date = '';
    $(this.export.nativeElement).modal('show');
  }

  public onCloseModal() {
    $(this.export.nativeElement).modal('hide');
  }

  public onExportModal() {
    if ((this.export_entrance_end_date.getTime() - this.export_entrance_start_date.getTime()) / 86400000 > 6) {
      this.globalService.promptBox.open('时间跨度最多支持7天!');
      return;
    }
    if (this.generateAndCheckExportParamsValid() === false || this.generateAndCheckParkNameValid() === false ||
      this.generateAndCheckLimitValid() === false) {
      return;
    } else {
      let tempBody = '';
      Object.getOwnPropertyNames(this.exportParams).forEach(property => {
        if (this.exportParams[property]) {
          tempBody += `${property}=` + encodeURIComponent(this.exportParams[property]) + '&';
        }
      });
      tempBody = tempBody.length > 0 ? tempBody.slice(0, tempBody.length - 1) : tempBody;
      const httpUrl = `${environment.CIPP_UNIVERSE}/parking_records/export?${tempBody}`;
      window.open(httpUrl);
      this.onCloseModal();
     }
    this.export_entrance_end_date = DateFormatHelper.Today;
    this.export_entrance_start_date = DateFormatHelper.AWeekAgo;
  }

  public generateAndCheckExportParamsValid(): boolean {
    if (this.export_entrance_start_date && this.export_entrance_end_date) {
      const sTimestamp = this.export_entrance_start_date.getTime() / 1000;
      let eTimeStamp = this.export_entrance_end_date.getTime() / 1000;
      if (sTimestamp > eTimeStamp) {
        this.globalService.promptBox.open('开始时间不能大于结束时间，请重新选择！');
        return false;
      }
      eTimeStamp = (new Date(this.export_entrance_end_date.getTime() + 86390000)).getTime() / 1000;
      this.exportParams.time_limit = sTimestamp + ',' + eTimeStamp;
    } else if (!this.export_entrance_start_date && this.export_entrance_end_date) {
      const eTimeStamp = this.export_entrance_end_date.getTime() / 1000;
      this.exportParams.time_limit = '0,' + eTimeStamp;
    } else if (this.export_entrance_start_date && !this.export_entrance_end_date) {
      const sTimestamp = this.export_entrance_start_date.getTime() / 1000;
      this.exportParams.time_limit = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
    } else {
      this.exportParams.time_limit = null;
    }
  }

  public generateAndCheckParkNameValid(): boolean {
    if (!this.exportParams.parking_name) {
      this.globalService.promptBox.open('请选择停车场！');
      return false;
    }
    return true;
  }

  public generateAndCheckLimitValid(): boolean {
    if (this.export_entrance_start_date === null || this.export_entrance_end_date === null) {
      this.globalService.promptBox.open('请选择导出期限！');
      return false;
    }
    return true;
  }
}
