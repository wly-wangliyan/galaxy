import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../../core/auth-guard.service';
import {RouteMonitorService} from '../../core/route-monitor.service';
import {RoutePreventService} from '../../core/route-prevent.service';
import {GroupsComponent} from './groups.component';
import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupsAddComponent} from './groups-add/groups-add.component';
import {GroupsEditComponent} from './groups-edit/groups-edit.component';
import {GroupsDetailComponent} from './groups-detail/groups-detail.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: GroupsComponent,
    canActivateChild: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', component: GroupsListComponent},
      {
        path: 'add', component: GroupsAddComponent,
        canDeactivate: [RoutePreventService]
      },
      {
        path: 'edit/:parking_group_id', component: GroupsEditComponent,
        canDeactivate: [RoutePreventService]
      },
      {path: 'detail/:parking_group_id', component: GroupsDetailComponent},
      {path: '**', redirectTo: ''}
    ]
  }])],
  exports: [RouterModule],
})
export class GroupsRoutingModule {
}
