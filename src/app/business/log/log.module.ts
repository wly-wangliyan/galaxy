import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRoutingModule } from './log-routing.module';
import {LogComponent} from './log.component';
import {ShareModule} from '../../share/share.module';
import {EditInfoPipe, LogPipe} from './log.pipe';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    LogRoutingModule,
  ],
  declarations: [LogComponent, LogPipe, EditInfoPipe]
})
export class LogModule { }
