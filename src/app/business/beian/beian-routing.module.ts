import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BeianComponent} from './beian.component';
import {BeianParkingsComponent} from './beian-parkings/beian-parkings.component';
import {BeianSystemsComponent} from './beian-systems/beian-systems.component';
import {CheckPendingComponent} from './beian-parkings/check-pending/check-pending.component';
import {NotPassComponent} from './beian-parkings/not-pass/not-pass.component';
import {CheckedComponent} from './beian-parkings/checked/checked.component';
import {ExamineParkingComponent} from './beian-parkings/examine/examine-parking.component';
import {SystemCheckPendingComponent} from './beian-systems/system-check-pending/system-check-pending.component';
import {SystemCheckedComponent} from './beian-systems/system-checked/system-checked.component';
import {SystemNotPassComponent} from './beian-systems/system-not-pass/system-not-pass.component';
import {ExamineSystemComponent} from './beian-systems/examine/examine-system.component';
import {RouteMonitorService} from '../../core/route-monitor.service';
import {AuthGuardService} from '../../core/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: BeianComponent,
        canActivateChild: [AuthGuardService, RouteMonitorService],
        children: [
          {path: '', redirectTo: 'parkings', pathMatch: 'full'},
          {
            path: 'parkings', component: BeianParkingsComponent,
            canActivateChild: [AuthGuardService, RouteMonitorService],
            children: [
              {path: '', redirectTo: 'check-pending', pathMatch: 'full'},
              {path: 'check-pending', component: CheckPendingComponent},
              {path: 'checked', component: CheckedComponent},
              {path: 'not-pass', component: NotPassComponent},
            ]
          },
          {path: 'parkings/:examine_type/examine/:parking_beian_id', component: ExamineParkingComponent},
          {
            path: 'systems', component: BeianSystemsComponent,
            canActivateChild: [AuthGuardService, RouteMonitorService],
            children: [
              {path: '', redirectTo: 'check-pending', pathMatch: 'full'},
              {path: 'check-pending', component: SystemCheckPendingComponent},
              {path: 'checked', component: SystemCheckedComponent},
              {path: 'not-pass', component: SystemNotPassComponent},
            ]
          },
          {path: 'systems/:examine_type/examine/:platform_beian_id', component: ExamineSystemComponent},
          {path: '**', redirectTo: 'parkings'}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class BeianRoutingModule {
}
