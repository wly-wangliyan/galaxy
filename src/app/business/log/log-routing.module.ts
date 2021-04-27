import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuardService} from '../../core/auth-guard.service';
import {RouteMonitorService} from '../../core/route-monitor.service';
import {LogComponent} from './log.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: LogComponent,
    canActivate: [AuthGuardService, RouteMonitorService],
  }])],
  exports: [RouterModule],
})
export class LogRoutingModule { }
