import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AccessParkingStateEntity, ChartFullScreen2HttpService } from '../../chart-full-screen2-http.service';
import { GlobalService } from '../../../../../../core/global.service';
import { FullScreenSelectComponent } from '../../../chart-full-screen/full-screen-select/full-screen-select.component';
import { ChartFullScreenService } from '../../../chart-full-screen/chart-full-screen.service';
import { GlobalConst } from '../../../../../../share/global-const';
import { DataStatisticsHttpService } from '../../../../../data-statistics/data-statistics-http.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-full-parking-access-state',
  templateUrl: './full-parking-access-state.component.html',
  styleUrls: ['./full-parking-access-state.component.css']
})
export class FullParkingAccessStateComponent implements OnInit {

  @Input() public sourceWidth: string;
  @Input() public sourceHeight: string;

  @Input() // 区分1：路内或2：路外
  public set areaType(area_type: number) {
    this.fullTitle = area_type === 1 ? '路内停车泊位运营情况' : '路外停车场接入情况';
    this._areaType = area_type;
  }

  private _areaType: number;
  public get areaType(): number {
    return this._areaType;
  }

  public fullTitle: string;
  public accessParkingStateInfo: AccessParkingStateEntity = new AccessParkingStateEntity();

  private dataSubscription: Subscription;
  private timerSubscription: Subscription;

  constructor(private chartFullScreen2HttpService: ChartFullScreen2HttpService,
              private dataStatisticsHttpService: DataStatisticsHttpService,
              private globalService: GlobalService, private fullScreenService: ChartFullScreenService) {

  }

  public ngOnInit() {
    this.requestData();
    this.timerSubscription = this.fullScreenService.timer_5minutes.subscribe(() => {
      this.requestData();
    });
  }

  public requestData() {
    this.dataSubscription && this.dataSubscription.unsubscribe();
    const httpList = [];
    httpList.push(this.chartFullScreen2HttpService.requestAccessParkingStateInfo());
    httpList.push(this.dataStatisticsHttpService.requestParkingDynamicUtilizationRate(GlobalConst.RegionID, null));
    this.dataSubscription = Observable.forkJoin(httpList).subscribe((results: Array<any>) => {
      this.accessParkingStateInfo = results[0];
      // 对应下方利用率两个图形数据(统一) by zack
      // this.accessParkingStateInfo.operate_inside_space_num = results[1].inside_total_num;
      // this.accessParkingStateInfo.operate_outside_space_num = results[1].outside_total_num;
    }, err => {
      this.globalService.httpErrorProcess(err);
    });
    // this.dataSubscription = this.chartFullScreen2HttpService.requestAccessParkingStateInfo().subscribe(data => {
    //   this.accessParkingStateInfo = data;
    // }, err => {
    //   this.globalService.httpErrorProcess(err);
    // });
  }

}
