import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {DataStatisticsRoutingModule} from './data-statistics-routing.module';
import {DataStatisticsComponent} from './data-statistics.component';
import {HistoryStatisticsComponent} from './history-statistics/history-statistics.component';
import {HistoryFlowComponent} from './history-statistics/history-flow/history-flow.component';
import {OnlineRateComponent} from './history-statistics/online-rate/online-rate.component';
import {TurnoverRateComponent} from './history-statistics/turnover-rate/turnover-rate.component';
import {PeriodTimeStatisticsComponent} from './period-time-statistics/period-time-statistics.component';
import {RealTimeFlowComponent} from './period-time-statistics/real-time-flow/real-time-flow.component';
import {ParkingFillingRateComponent} from './period-time-statistics/parking-filling-rate/parking-filling-rate.component';
import {RealTimeDataComponent} from './period-time-statistics/real-time-data/real-time-data.component';
import { ParkingStatisticsComponent } from './parking-statistics/parking-statistics.component';
import { TerminalStatisticsComponent } from './terminal-statistics/terminal-statistics.component';
import {ParkingFlowByhourComponent} from './parking-statistics/parking-flow-byhour/parking-flow-byhour.component';
@NgModule({
  imports: [
    ShareModule,
    DataStatisticsRoutingModule
  ],
  declarations: [DataStatisticsComponent,
    HistoryStatisticsComponent,
    HistoryFlowComponent,
    OnlineRateComponent,
    TurnoverRateComponent,
    PeriodTimeStatisticsComponent,
    RealTimeFlowComponent,
    ParkingFillingRateComponent,
    RealTimeDataComponent,
    ParkingStatisticsComponent,
    TerminalStatisticsComponent,
    ParkingFlowByhourComponent]
})
export class DataStatisticsModule {
}
