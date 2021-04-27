import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BeianComponent} from './beian.component';
import {ShareModule} from '../../share/share.module';
import {BeianRoutingModule} from './beian-routing.module';
import {BeianParkingsComponent} from './beian-parkings/beian-parkings.component';
import {BeianSystemsComponent} from './beian-systems/beian-systems.component';
import {CheckPendingComponent} from './beian-parkings/check-pending/check-pending.component';
import {CheckedComponent} from './beian-parkings/checked/checked.component';
import {NotPassComponent} from './beian-parkings/not-pass/not-pass.component';
import {ExamineParkingComponent} from './beian-parkings/examine/examine-parking.component';
import {ParkingListComponent} from './beian-parkings/parking-list/parking-list.component';
import {SystemListComponent} from './beian-systems/system-list/system-list.component';
import {ExamineSystemComponent} from './beian-systems/examine/examine-system.component';
import {SystemNotPassComponent} from './beian-systems/system-not-pass/system-not-pass.component';
import {SystemCheckedComponent} from './beian-systems/system-checked/system-checked.component';
import {SystemCheckPendingComponent} from './beian-systems/system-check-pending/system-check-pending.component';

@NgModule({
  imports: [
    ShareModule,
    BeianRoutingModule
  ],
  declarations: [
    BeianComponent,
    BeianParkingsComponent,
    BeianSystemsComponent,
    CheckPendingComponent,
    CheckedComponent,
    NotPassComponent,
    ExamineParkingComponent,
    ParkingListComponent,

    ExamineSystemComponent,
    SystemNotPassComponent,
    SystemCheckedComponent,
    SystemCheckPendingComponent,
    SystemListComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BeianModule {
}
