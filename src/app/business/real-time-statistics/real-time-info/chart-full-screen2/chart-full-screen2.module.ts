import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../share/share.module';
import {FullScreen5Component} from './full-screen5/full-screen5.component';
import {FullScreen6Component} from './full-screen6/full-screen6.component';
import {FullMap2Component} from './components/full-map2/full-map2.component';
import {FullBorder2Component} from './components/full-border2/full-border2.component';
import {FullProgressbar2Component} from './components/full-progressbar2/full-progressbar2.component';
import {FullCounter2Component} from './components/full-counter2/full-counter2.component';
import {FullTitle2Component} from './components/full-title2/full-title2.component';
import {FullMonitor2Component} from './components/full-monitor2/full-monitor2.component';
import {FullParkingFlowTable2Component} from './components/full-parking-flow-table2/full-parking-flow-table2.component';
import {SplitNumber2Component} from './components/split-number2/split-number2.component';
import {ChartScrollNumber2Component} from './components/chart-scroll-number2/chart-scroll-number2.component';
import {FullDailyFlowStatisticsComponent} from './components/full-daily-flow-statistics/full-daily-flow-statistics.component';
import {FullParkingUtilizationRate2Component} from './components/full-parking-utilization-rate2/full-parking-utilization-rate2.component';
import {FullFlowDistributionCurve2Component} from './components/full-flow-distribution-curve2/full-flow-distribution-curve2.component';
import {FullTurnoverRate2Component} from './components/full-turnover-rate2/full-turnover-rate2.component';
import {FullParkingAccessStateComponent} from './components/full-parking-access-state/full-parking-access-state.component';
import {ChartFullScreen2HttpService} from './chart-full-screen2-http.service';
import {MapMonitorVideoComponent} from '../components/map-monitor-video/map-monitor-video.component';
import {ParkingState2Pipe} from './pipes/parking-state2.pipe';
import {FullScreen7Component} from './full-screen7/full-screen7.component';
import {FullScreenItemComponent} from './components/full-screen-item/full-screen-item.component';
import {Screen7LeftOneComponent} from './components/screen7-left-one/screen7-left-one.component';
import {Screen7LeftTwoComponent} from './components/screen7-left-two/screen7-left-two.component';
import {Screen7LeftThreeComponent} from './components/screen7-left-three/screen7-left-three.component';
import {Screen7LeftFourComponent} from './components/screen7-left-four/screen7-left-four.component';
import {Screen7LeftFiveComponent} from './components/screen7-left-five/screen7-left-five.component';
import {FullMap7Component} from './components/full-map7/full-map7.component';
import {Screen7RightOneComponent} from './components/screen7-right-one/screen7-right-one.component';
import {Screen7RightTwoComponent} from './components/screen7-right-two/screen7-right-two.component';
import {Screen7RightThreeComponent} from './components/screen7-right-three/screen7-right-three.component';
import {Screen7RightFourComponent} from './components/screen7-right-four/screen7-right-four.component';
import {Screen7RightFiveComponent} from './components/screen7-right-five/screen7-right-five.component';
import {Screen7RightSixComponent} from './components/screen7-right-six/screen7-right-six.component';
import {ContentHoverDirective} from "./directives/content-hover/content-hover.directive";
import {ContentHoverComponent} from "./directives/content-hover/content-hover.component";
import { FullMonitor3Component } from './components/full-monitor3/full-monitor3.component';
import { FullFlowDistributionCurve3Component } from './components/full-flow-distribution-curve3/full-flow-distribution-curve3.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    FullScreen5Component,
    FullScreen6Component,
    FullMap2Component,
    FullBorder2Component,
    FullProgressbar2Component,
    FullCounter2Component,
    FullTitle2Component,
    FullMonitor2Component,
    FullParkingFlowTable2Component,
    SplitNumber2Component,
    ChartScrollNumber2Component,
    FullDailyFlowStatisticsComponent,
    FullParkingUtilizationRate2Component,
    FullFlowDistributionCurve2Component,
    FullTurnoverRate2Component,
    FullParkingAccessStateComponent,
    MapMonitorVideoComponent,
    FullScreenItemComponent,
    FullScreen7Component,
    Screen7LeftOneComponent,
    Screen7LeftTwoComponent,
    Screen7LeftThreeComponent,
    Screen7LeftFourComponent,
    Screen7LeftFiveComponent,
    FullMap7Component,
    Screen7RightOneComponent,
    Screen7RightTwoComponent,
    Screen7RightThreeComponent,
    Screen7RightFourComponent,
    Screen7RightFiveComponent,
    Screen7RightSixComponent,
    ContentHoverComponent,
    // pipe
    ParkingState2Pipe,
    // directive
    ContentHoverDirective,
    FullMonitor3Component,
    FullFlowDistributionCurve3Component
  ],
  entryComponents: [
    FullScreen5Component,
    FullScreen6Component,
    FullScreen7Component,
    ContentHoverComponent,
  ],
  exports: [
    FullScreen5Component,
    FullScreen6Component,
    FullScreen7Component,
    ContentHoverComponent
  ],
  providers: [
    ChartFullScreen2HttpService
  ]
})
export class ChartFullScreen2Module {
}
