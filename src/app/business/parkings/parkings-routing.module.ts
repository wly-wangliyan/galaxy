import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../../core/auth-guard.service';
import {ParkingsComponent} from './parkings.component';
import {ParkingsListComponent} from './parkings-list/parkings-list.component';
import {ParkingsAddComponent} from './parkings-add/parkings-add.component';
import {BasicInfoComponent} from './parkings-add/basic-info/basic-info.component';
import {SelectGroupsComponent} from './parkings-add/select-groups/select-groups.component';
import {ParkingsEditComponent} from './parkings-edit/parkings-edit.component';
import {EditBasicInfoComponent} from './parkings-edit/basic-info/basic-info.component';
import {EditOperationRelationComponent} from './parkings-edit/operation-relation/operation-relation.component';
import {EditSelectGroupsComponent} from './parkings-edit/select-groups/select-groups.component';
import {RouteMonitorService} from '../../core/route-monitor.service';
import {RoutePreventService} from '../../core/route-prevent.service';
import {ParkingUpdateRecordComponent} from './parking-update-record/parking-update-record.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: ParkingsComponent,
    canActivateChild: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', component: ParkingsListComponent},
      {
        path: 'groups',
        loadChildren: './../../business/groups/groups.module#GroupsModule',
        canLoad: [AuthGuardService]
      },
      {
        path: 'add', component: ParkingsAddComponent,
        children: [
          {path: '', redirectTo: 'basic-info', pathMatch: 'full'},
          {
            path: 'basic-info', component: BasicInfoComponent,
            canDeactivate: [RoutePreventService]
          },
          {
            path: 'select-groups/:parking_id', component: SelectGroupsComponent,
            canDeactivate: [RoutePreventService]
          }
        ]
      },
      {path: 'detail/:parking_id/update-records', component: ParkingUpdateRecordComponent},
      {
        path: 'detail/:parking_id', component: ParkingsEditComponent,
        children: [
          {path: '', redirectTo: 'basic-info', pathMatch: 'full'},
          {path: 'basic-info', component: EditBasicInfoComponent},
          {path: 'operation-relation', component: EditOperationRelationComponent},
          // {
          //   path: 'select-groups', component: EditSelectGroupsComponent,
          //   canDeactivate: [RoutePreventService]
          // },
        ]
      },
      {path: '**', redirectTo: ''}
    ]
  }])],
  exports: [RouterModule],
})
export class ParkingsRoutingModule {
}
