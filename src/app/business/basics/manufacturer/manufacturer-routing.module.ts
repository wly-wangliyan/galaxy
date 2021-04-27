import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../../../core/auth-guard.service';
import {RouteMonitorService} from '../../../core/route-monitor.service';
import {ManufacturerListComponent} from './manufacturer-list/manufacturer-list.component';
import {ManufacturerDetailComponent} from './manufacturer-detail/manufacturer-detail.component';
import {ManufacturerDataComponent} from './manufacturer-detail/manufacturer-data/manufacturer-data.component';
import {ManufacturerParkingComponent} from './manufacturer-detail/manufacturer-parking/manufacturer-parking.component';
import {ManufacturerPlatformComponent} from './manufacturer-detail/manufacturer-platform/manufacturer-platform.component';
import {ManufacturerComponent} from './manufacturer.component';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: ManufacturerComponent,
    canActivateChild: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', component: ManufacturerListComponent},
      {
        path: 'detail/:manufacturer_id', component: ManufacturerDetailComponent,
        canActivateChild: [AuthGuardService, RouteMonitorService],
        children: [
          {path: '', redirectTo: 'data', pathMatch: 'full'},
          {path: 'data', component: ManufacturerDataComponent},
          {path: 'parkings', component: ManufacturerParkingComponent},
          {path: 'platforms', component: ManufacturerPlatformComponent},
          {path: '**', redirectTo: ''}
        ]
      },
      {path: '**', redirectTo: ''}
    ]
  }])],
  exports: [RouterModule],
})
export class ManufacturerRoutingModule {
}
