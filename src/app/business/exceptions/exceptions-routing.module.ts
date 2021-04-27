import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExceptionsComponent} from './exceptions.component';
import {AuthGuardService} from '../../core/auth-guard.service';
import {RouteMonitorService} from '../../core/route-monitor.service';
import { PushSettingsComponent } from './push-settings/push-settings.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: ExceptionsComponent,
    canActivate: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', component: ExceptionsComponent},
      {
        path: 'pushSettings', component: PushSettingsComponent
      }
    ]
  }])],
  exports: [RouterModule],
})
export class ExceptionsRoutingModule {
}
