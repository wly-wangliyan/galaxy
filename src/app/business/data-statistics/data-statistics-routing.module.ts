import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DataStatisticsComponent} from './data-statistics.component';
import {AuthGuardService} from '../../core/auth-guard.service';
import {HistoryStatisticsComponent} from './history-statistics/history-statistics.component';
import {HistoryFlowComponent} from './history-statistics/history-flow/history-flow.component';
import {OnlineRateComponent} from './history-statistics/online-rate/online-rate.component';
import {TurnoverRateComponent} from './history-statistics/turnover-rate/turnover-rate.component';
import {PeriodTimeStatisticsComponent} from './period-time-statistics/period-time-statistics.component';
import {RealTimeFlowComponent} from './period-time-statistics/real-time-flow/real-time-flow.component';
import {ParkingFillingRateComponent} from './period-time-statistics/parking-filling-rate/parking-filling-rate.component';
import {RealTimeDataComponent} from './period-time-statistics/real-time-data/real-time-data.component';
import {RouteMonitorService} from '../../core/route-monitor.service';

import {ParkingStatisticsComponent} from './parking-statistics/parking-statistics.component';

import {TerminalStatisticsComponent} from './terminal-statistics/terminal-statistics.component';


@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: DataStatisticsComponent,
    children: [
      {path: '', redirectTo: 'period-time', pathMatch: 'full'},
      {
        path: 'period-time', component: PeriodTimeStatisticsComponent,
        canActivateChild: [AuthGuardService, RouteMonitorService],
        children: [
          {path: '', redirectTo: 'flow', pathMatch: 'full'},
          {path: 'flow', component: RealTimeFlowComponent},
          {path: 'filling-rate', component: ParkingFillingRateComponent},
          {path: 'data', component: RealTimeDataComponent},
          {path: '**', redirectTo: 'flow'}
        ]
      },
      {
        path: 'history', component: HistoryStatisticsComponent,
        canActivateChild: [AuthGuardService, RouteMonitorService],
        children: [
          {path: '', redirectTo: 'flow', pathMatch: 'full'},
          {path: 'flow', component: HistoryFlowComponent},
          // {path: 'data', component: HistoryDataComponent},
          {path: 'online-rate', component: OnlineRateComponent},
          {path: 'turnover-rate', component: TurnoverRateComponent},
          {path: '**', redirectTo: 'flow'}
        ]
      },
      {
        path: 'terminal', component: TerminalStatisticsComponent,
        canActivate: [AuthGuardService, RouteMonitorService],
      },
      {
        path: 'parking', component: ParkingStatisticsComponent,
        canActivate: [AuthGuardService, RouteMonitorService],
      },
      {path: '**', redirectTo: 'period-time'}
    ]
  }])],
  exports: [RouterModule],
})
export class DataStatisticsRoutingModule {
}
