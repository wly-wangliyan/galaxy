import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {RealTimeStatisticsComponent} from './real-time-statistics.component';
import {RealTimeInfoComponent} from './real-time-info/real-time-info.component';
import {ParkingStateComponent} from './parking-state/parking-state.component';
import {ThermodynamicChartComponent} from './thermodynamic-chart/thermodynamic-chart.component';
import {RealTimeStatisticsRoutingModule} from './real-time-statistics-routing.module';
import {ChartOnlineStateComponent} from './real-time-info/chart-online-state/chart-online-state.component';
import {ChartParkingUtilizationRateComponent} from './real-time-info/chart-parking-utilization-rate/chart-parking-utilization-rate.component';
import {ChartParkingSpotTopsComponent} from './real-time-info/chart-parking-spot-tops/chart-parking-spot-tops.component';
import {ChartProgressbarComponent} from './real-time-info/components/chart-progressbar/chart-progressbar.component';
import {ChartFlowTopsComponent} from './real-time-info/chart-flow-tops/chart-flow-tops.component';
import {ChartMonitorComponent} from './real-time-info/chart-monitor/chart-monitor.component';
import {ChartFlowComponent} from './real-time-info/chart-flow/chart-flow.component';
import {CitySelectComponent} from './thermodynamic-chart/components/city-select/city-select.component';
import {ParkingSelectComponent} from './thermodynamic-chart/components/parking-select/parking-select.component';
import {ChartFullScreenComponent} from './real-time-info/chart-full-screen/chart-full-screen.component';
import {FullMapComponent} from './real-time-info/chart-full-screen/components/full-map/full-map.component';
import {FullBorderComponent} from './real-time-info/chart-full-screen/components/full-border/full-border.component';
import {FullMonitorComponent} from './real-time-info/chart-full-screen/components/full-monitor/full-monitor.component';
import {FullTitleComponent} from './real-time-info/chart-full-screen/components/full-title/full-title.component';
import {FullOnlineStateComponent} from './real-time-info/chart-full-screen/components/full-online-state/full-online-state.component';
import {FullParkingUtilizationRateComponent} from './real-time-info/chart-full-screen/components/full-parking-utilization-rate/full-parking-utilization-rate.component';
import {FullUserTypeRatioComponent} from './real-time-info/chart-full-screen/components/full-user-type-ratio/full-user-type-ratio.component';
import {FullParkingFlowTableComponent} from './real-time-info/chart-full-screen/components/full-parking-flow-table/full-parking-flow-table.component';
import {SplitNumberComponent} from './real-time-info/components/split-number/split-number.component';
import {FullProgressbarComponent} from './real-time-info/chart-full-screen/components/full-progressbar/full-progressbar.component';
import {FullCounterComponent} from './real-time-info/chart-full-screen/components/full-counter/full-counter.component';
import {FullFlowStatisticsComponent} from './real-time-info/chart-full-screen/components/full-flow-statistics/full-flow-statistics.component';
import {FullFlowDistributionCurveComponent} from './real-time-info/chart-full-screen/components/full-flow-distribution-curve/full-flow-distribution-curve.component';
import {ChatScrollNumberComponent} from './real-time-info/components/chat-scroll-number/chat-scroll-number.component';
import {ChartUserTypeRatioComponent} from './real-time-info/chart-user-type-ratio/chart-user-type-ratio.component';
import {ChartFlowDistributionComponent} from './real-time-info/chart-flow-distribution/chart-flow-distribution.component';
import {FullMxNewUsersComponent} from './real-time-info/chart-full-screen/components/full-mx-new-users/full-mx-new-users.component';
import {FullWxmpNewUsersComponent} from './real-time-info/chart-full-screen/components/full-wxmp-new-users/full-wxmp-new-users.component';
import {FullScreen1Component} from './real-time-info/chart-full-screen/full-screen1/full-screen1.component';
import {FullScreen2Component} from './real-time-info/chart-full-screen/full-screen2/full-screen2.component';
import {FullScreen3Component} from './real-time-info/chart-full-screen/full-screen3/full-screen3.component';
import {FullScreen4Component} from './real-time-info/chart-full-screen/full-screen4/full-screen4.component';
import {FullScreenDirective} from './real-time-info/chart-full-screen/full-screen.directive';
import {FullScreenSelectComponent} from './real-time-info/chart-full-screen/full-screen-select/full-screen-select.component';
import {FullScreenContainerComponent} from './real-time-info/chart-full-screen/full-screen-container/full-screen-container.component';
import {FullParkingInfoTableComponent} from './real-time-info/chart-full-screen/components/full-parking-info-table/full-parking-info-table.component';
import {ShowFullScreenComponent} from './real-time-info/directives/show-full-screen/show-full-screen.component';
import {ShowFullScreenDblclickDirective} from './real-time-info/directives/show-full-screen-dblclick.directive';
import { ParkingStateSimpleComponent } from './parking-state-simple/parking-state-simple.component';
import { ParkingStateCompleteComponent } from './parking-state-complete/parking-state-complete.component';
import {ChartFullScreen2Module} from './real-time-info/chart-full-screen2/chart-full-screen2.module';

@NgModule({
  imports: [
    ShareModule,
    RealTimeStatisticsRoutingModule,
    ChartFullScreen2Module,
  ],
  declarations: [RealTimeStatisticsComponent,
    RealTimeInfoComponent,
    ParkingStateComponent,
    ThermodynamicChartComponent,
    ChartOnlineStateComponent,
    ChartParkingUtilizationRateComponent,
    ChartProgressbarComponent,
    ChartParkingSpotTopsComponent,
    ChartFlowTopsComponent,
    ChartMonitorComponent,
    ChartFlowComponent,
    CitySelectComponent,
    ParkingSelectComponent,
    ChartFullScreenComponent,
    FullMapComponent,
    FullBorderComponent,
    FullMonitorComponent,
    FullTitleComponent,
    FullOnlineStateComponent,
    FullParkingUtilizationRateComponent,
    FullUserTypeRatioComponent,
    FullParkingFlowTableComponent,
    FullParkingInfoTableComponent,
    SplitNumberComponent,
    FullProgressbarComponent,
    FullCounterComponent,
    FullFlowStatisticsComponent,
    FullFlowDistributionCurveComponent,
    ChatScrollNumberComponent,
    ChartUserTypeRatioComponent,
    ChartFlowDistributionComponent,
    FullMxNewUsersComponent,
    FullWxmpNewUsersComponent,
    // 全屏相关
    ShowFullScreenDblclickDirective,
    ShowFullScreenComponent,
    ChartFullScreenComponent,
    FullScreen1Component,
    FullScreen2Component,
    FullScreen3Component,
    FullScreen4Component,
    FullScreenDirective,
    FullScreenSelectComponent,
    FullScreenContainerComponent,
    ParkingStateSimpleComponent,
    ParkingStateCompleteComponent,
    // 建委
    // FullScreen5Component,
    // FullScreen6Component,
    // FullMap2Component,
  ],
  entryComponents: [
    ShowFullScreenComponent,
    FullScreen1Component,
    FullScreen2Component,
    FullScreen3Component,
    FullScreen4Component,
    FullScreenSelectComponent,

    // FullScreen5Component,
    // FullScreen6Component,
  ]
})
export class RealTimeStatisticsModule {
}
