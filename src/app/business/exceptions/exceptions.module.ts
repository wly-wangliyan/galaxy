import { NgModule } from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {ExceptionsRoutingModule} from './exceptions-routing.module';
import {ExceptionsComponent} from './exceptions.component';
import { ExceptionsStatusPipe } from './exceptions-status.pipe';
import { PushSettingsComponent } from './push-settings/push-settings.component';

@NgModule({
  imports: [
    ShareModule,
    ExceptionsRoutingModule
  ],
  declarations: [ExceptionsComponent, ExceptionsStatusPipe, PushSettingsComponent]
})
export class ExceptionsModule { }
