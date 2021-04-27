import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../../core/auth-guard.service';
import {RealTimeStatisticsComponent} from './real-time-statistics.component';
import {RealTimeInfoComponent} from './real-time-info/real-time-info.component';
import {ThermodynamicChartComponent} from './thermodynamic-chart/thermodynamic-chart.component';
import {ParkingStateComponent} from './parking-state/parking-state.component';
import {RouteMonitorService} from '../../core/route-monitor.service';
import {ParkingStateSimpleComponent} from './parking-state-simple/parking-state-simple.component';
import {ParkingStateCompleteComponent} from './parking-state-complete/parking-state-complete.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: RealTimeStatisticsComponent,
    canActivateChild: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'info', component: RealTimeInfoComponent},
      {path: 'thermodynamic-chart', component: ThermodynamicChartComponent},
      {path: 'parking-state', component: ParkingStateComponent, children: [
          {path: '', redirectTo: 'parking-state-simple', pathMatch: 'full'},
          {path: 'parking-state-simple', component: ParkingStateSimpleComponent},
          {path: 'parking-state-complete', component: ParkingStateCompleteComponent}
        ]},
      {path: '**', redirectTo: 'info'}
    ]
  }])],
  exports: [RouterModule],
})
export class RealTimeStatisticsRoutingModule {
}
