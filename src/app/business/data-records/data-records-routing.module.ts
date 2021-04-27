import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DataRecordsComponent} from './data-records.component';
import {ParkingRecordsComponent} from './parking-records/parking-records.component';
import {UploadRecordsComponent} from './upload-records/upload-records.component';
import {OrderRecordsComponent} from './order-records/order-records.component';
import {AuthGuardService} from '../../core/auth-guard.service';
import {RouteMonitorService} from '../../core/route-monitor.service';

@NgModule({
  imports: [RouterModule.forChild([{
    path: '', component: DataRecordsComponent,
    canActivateChild: [AuthGuardService, RouteMonitorService],
    children: [
      {path: '', redirectTo: 'parking', pathMatch: 'full'},
      {path: 'parking', component: ParkingRecordsComponent},
      {path: 'upload', component: UploadRecordsComponent},
      {path: 'order', component: OrderRecordsComponent},
      {path: '**', redirectTo: 'parking'}
    ]
  }])],
  exports: [RouterModule],
})
export class DataRecordsRoutingModule {
}
