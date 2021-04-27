import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../../core/global.service';
import {SearchAdapter, SearchAssistant} from '../../../../share/search-assistant';
import {
  BeianHttpService
} from '../../beian-http.service';
import {DateFormatHelper} from '../../../../../utils/date-format-helper';
import {ExamineType, PlatformBeianEntity, PlatformBeianSearchParams} from '../../beian.model';
import {DataCacheService} from '../../../../core/data-cache.service';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.css', '../../beian.component.css']
})
export class SystemListComponent implements SearchAdapter, OnInit, OnDestroy {

  @Input() public searchParams: PlatformBeianSearchParams;

  @Input() public examineType: ExamineType;

  public searchAssistant: SearchAssistant;

  public selectPlatform: PlatformBeianEntity = new PlatformBeianEntity();

  public platformBeianList: Array<PlatformBeianEntity> = [];

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

  public startDate: Date; // 提交时间
  public endDate: Date;

  public reviewedStartDate: Date; // 审核时间
  public reviewedEndDate: Date;

  public BEIAN_TYPE = 'system';

  public isLoadComplete = false; // 数据是否加载完成

  constructor(private beianHttpService: BeianHttpService,
              private globalService: GlobalService,
              private dataCacheService: DataCacheService) {
  }

  public ngOnInit() {
    this.dataCacheService.getCache().subscribe(cache => {
      if (cache && cache['examineType'] === this.examineType && this.BEIAN_TYPE === cache['BEIAN_TYPE']) {
        this.searchParams = cache['searchParams'];
        this.platformBeianList = cache['platformBeianList'];
        this.searchAssistant = cache['searchAssistant'];
        this.selectPlatform = cache['selectPlatform'];

        // 将缓存的检索适配器连接到当前的适配者
        this.searchAssistant.connect(this);
      } else {
        cache && this.dataCacheService.clear();
        // 没有缓存则直接使用初始化参数请求数据
        this.searchAssistant = new SearchAssistant(this);
        this.searchAssistant.submitSearch(true);
      }
    });
  }

  public onSelect(platform: PlatformBeianEntity) {
    this.selectPlatform = platform;
  }

  public ngOnDestroy() {
    // 当页面销毁时缓存数据,并解除检索适配器对页面的引用
    this.searchAssistant.disconnect();
    this.dataCacheService.setCache(this, 'searchParams', 'platformBeianList', 'searchAssistant', 'selectPlatform', 'examineType', 'BEIAN_TYPE');
  }

  public getExamineTypeStr(): string {
    const examineTypeObj = {
      0: 'check-pending',
      1: 'checked',
      2: 'not-pass'
    };
    return examineTypeObj[this.examineType];
  }

  /* SearchDecorator 接口实现 */

  /* 请求检索 */
  public requestSearch(): any {
    this.isLoadComplete = false;
    return this.beianHttpService.requestPlatformAuditBeianList(this.searchParams);
  }

  public continueSearch(url: string): any {
    return this.beianHttpService.continueAuditPlatformBeianList(url);
  }

  /* 生成并检查参数有效性 */
  public generateAndCheckParamsValid(): boolean {
    const oneDayDuration = 24 * 60 * 60 - 1;
    if (this.examineType === ExamineType.checkPending) {


      // 提交时间的校验
      if (this.startDate && this.endDate) {
        const sTimestamp = new Date(this.startDate).getTime() / 1000;
        const eTimeStamp = new Date(this.endDate).getTime() / 1000 + oneDayDuration;
        if (sTimestamp > eTimeStamp) {
          this.globalService.promptBox.open('提交开始时间不能大于结束时间，请重新选择！');
          return false;
        }
        this.searchParams.section = sTimestamp + ',' + eTimeStamp;
      } else if (!this.startDate && this.endDate) {
        const eTimeStamp = new Date(this.endDate).getTime() / 1000 + oneDayDuration;
        this.searchParams.section = '0,' + eTimeStamp;
      } else if (this.startDate && !this.endDate) {
        const sTimestamp = new Date(this.startDate).getTime() / 1000;
        this.searchParams.section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
      } else {
        this.searchParams.section = null;
      }
    } else {


      // 审核时间的校验
      if (this.reviewedStartDate && this.reviewedEndDate) {
        const sTimestamp = new Date(this.reviewedStartDate).getTime() / 1000;
        const eTimeStamp = new Date(this.reviewedEndDate).getTime() / 1000 + oneDayDuration;
        if (sTimestamp > eTimeStamp) {
          this.globalService.promptBox.open('审核开始时间不能大于结束时间，请重新选择！');
          return false;
        }
        this.searchParams.section = sTimestamp + ',' + eTimeStamp;
      } else if (!this.reviewedStartDate && this.reviewedEndDate) {
        const eTimeStamp = new Date(this.reviewedEndDate).getTime() / 1000 + oneDayDuration;
        this.searchParams.section = '0,' + eTimeStamp;
      } else if (this.reviewedStartDate && !this.reviewedEndDate) {
        const sTimestamp = new Date(this.reviewedStartDate).getTime() / 1000;
        this.searchParams.section = sTimestamp + ',' + DateFormatHelper.ForeverTimestamp;
      } else {
        this.searchParams.section = null;
      }
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

    this.platformBeianList = results;
    this.isLoadComplete = true;
  }
}
