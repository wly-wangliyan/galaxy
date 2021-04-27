import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressModalComponent} from "./progress-modal.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ProgressModalComponent],
  exports: [ProgressModalComponent]
})
export class ProgressModalModule { }
