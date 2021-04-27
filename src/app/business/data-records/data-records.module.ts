import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {DataRecordsRoutingModule} from './data-records-routing.module';
import {DataRecordsComponent} from './data-records.component';
import {UploadRecordsComponent} from './upload-records/upload-records.component';
import {ParkingRecordsComponent} from './parking-records/parking-records.component';
import {OrderRecordsComponent} from './order-records/order-records.component';
import {ParkingsHttpService} from '../parkings/parkings-http.service';

@NgModule({
  imports: [
    ShareModule,
    DataRecordsRoutingModule,
  ],
  declarations: [DataRecordsComponent, UploadRecordsComponent, ParkingRecordsComponent, OrderRecordsComponent],
  providers: [ParkingsHttpService]
})
export class DataRecordsModule {
}
