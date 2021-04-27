import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExpandedMenuComponent} from './components/expanded-menu/expanded-menu.component';
import {ConfirmationBoxComponent} from './components/prompts/confirmation-box/confirmation-box.component';
import {PromptBoxComponent} from './components/prompts/prompt-box/prompt-box.component';
import {Http500PageComponent} from './components/prompts/http-500-page/http-500-page.component';
import {Http403PageComponent} from './components/prompts/http-403-page/http-403-page.component';
import {NoDataPageComponent} from './components/prompts/no-data-page/no-data-page.component';
import {ZPhotoSelectComponent} from './components/z-photo-select/z-photo-select.component';
import {ProCityDistSelectComponent} from './components/pro-city-dist-select/pro-city-dist-select.component';
import {DateTimeComponent} from './components/date-time/date-time.component';
import {DateTimeYMDHMSComponent} from './components/date-time-YMDHMS/date-time-YMDHMS.component';
import {DropDownBoxComponent} from './components/drop-down-box/drop-down-box.component';
import {ZRegexDirective} from './directives/z-regex.directive';
import {PaginationComponent} from './components/pagination/pagination.component';
import {IgnoreSpaceDirective} from './directives/ignore-space.directive';
import {ZNumberPipe} from './pipes/z-number.pipe';
import {ZMaxLengthPipe} from './pipes/z-max-length.pipe';
import {CrumbComponent} from './components/crumb/crumb.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {ZMapSelectPointComponent} from './components/z-map-select-point/z-map-select-point.component';
import {UserTypePipe} from './pipes/user-type.pipe';
import {ZDurationPipe} from './pipes/z-duration.pipe';
import {ZTenThousandUnitPipe} from './pipes/z-ten-thousand-unit.pipe';
import {ChartCounterComponent} from './components/chart-counter/chart-counter.component';
import {ZFormatDurationPipe} from './pipes/z-format-duration.pipe';
import {UploadContentTypePipe} from './pipes/upload-content-type.pipe';
import {
  ParkingTypePipe,
  ParkingAreaTypePipe,
  ParkingGroupTypePipe,
  ParkingUpdateTypePipe,
  ParkingOperateTypePipe,
  ParkingFormatAddressPipe, PayTypePipe, OpenTypePipe
} from './pipes/parking-type.pipe';
import {SearchSelectorComponent} from './components/search-selector/search-selector.component';
import {ParkingStatePipe, ScreenParkingStatePipe} from './pipes/parking-state.pipe';
import {RevieweStatusPipe} from './pipes/reviewe-status.pipe';
import {ZPlaceholderPipe} from './pipes/z-placeholder.pipe';
import {PaidTypePipe} from './pipes/paid-type.pipe';
import {ManufacturerModalComponent} from './components/details/manufacturer-modal/manufacturer-modal.component';
import {CompanyModalComponent} from './components/details/company-modal/company-modal.component';
import {ParkingModalComponent} from './components/details/parking-modal/parking-modal.component';
import {ChartCounterBgComponent} from './components/chart-counter-bg/chart-counter-bg.component';
import {BeautifyCheckboxComponent} from './components/beautify-checkbox/beautify-checkbox.component';
import {Http502PageComponent} from './components/prompts/http-502-page/http-502-page.component';
import {BeautifyRadioComponent} from './components/beautify-radio/beautify-radio.component';
import {InputSelectorComponent} from './components/input-selector/input-selector.component';
import { ZeroFillPipe } from './pipes/zero-fill.pipe';
import {MagicNumberItemComponent} from './components/magic-number-item/magic-number-item.component';
import {MagicNumberComponent} from './components/magic-number/magic-number.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule
  ],
  declarations: [
    ExpandedMenuComponent,
    ConfirmationBoxComponent,
    PromptBoxComponent,
    Http500PageComponent,
    Http403PageComponent,
    Http502PageComponent,
    NoDataPageComponent,
    ZPhotoSelectComponent,
    ProCityDistSelectComponent,
    DateTimeComponent,
    DateTimeYMDHMSComponent,
    DropDownBoxComponent,
    ZRegexDirective,
    PaginationComponent,
    IgnoreSpaceDirective,
    ZNumberPipe,
    ZMaxLengthPipe,
    CrumbComponent,
    ZMapSelectPointComponent,
    UserTypePipe,
    ZDurationPipe,
    ZTenThousandUnitPipe,
    ChartCounterComponent,
    ParkingTypePipe,
    ParkingAreaTypePipe,
    ZFormatDurationPipe,
    UploadContentTypePipe,
    ParkingGroupTypePipe,
    ParkingUpdateTypePipe,
    ParkingOperateTypePipe,
    ParkingFormatAddressPipe,
    SearchSelectorComponent,
    ParkingStatePipe,
    RevieweStatusPipe,
    ZPlaceholderPipe,
    PaidTypePipe,
    ManufacturerModalComponent,
    CompanyModalComponent,
    ParkingModalComponent,
    ChartCounterBgComponent,
    BeautifyCheckboxComponent,
    Http502PageComponent,
    BeautifyRadioComponent,
    InputSelectorComponent,
    PayTypePipe,
    OpenTypePipe,
    ZeroFillPipe,
    MagicNumberItemComponent,
    MagicNumberComponent,
    ScreenParkingStatePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule,
    ExpandedMenuComponent,
    ConfirmationBoxComponent,
    PromptBoxComponent,
    Http500PageComponent,
    Http403PageComponent,
    Http502PageComponent,
    NoDataPageComponent,
    ZPhotoSelectComponent,
    ProCityDistSelectComponent,
    IgnoreSpaceDirective,
    ZRegexDirective,
    ZNumberPipe,
    ZMaxLengthPipe,
    DateTimeComponent,
    DateTimeYMDHMSComponent,
    DropDownBoxComponent,
    PaginationComponent,
    CrumbComponent,
    ZMapSelectPointComponent,
    UserTypePipe,
    ZDurationPipe,
    ZTenThousandUnitPipe,
    ChartCounterComponent,
    ParkingTypePipe,
    ParkingAreaTypePipe,
    ZFormatDurationPipe,
    UploadContentTypePipe,
    ParkingGroupTypePipe,
    ParkingUpdateTypePipe,
    ParkingOperateTypePipe,
    ParkingFormatAddressPipe,
    SearchSelectorComponent,
    ParkingStatePipe,
    RevieweStatusPipe,
    ZPlaceholderPipe,
    PaidTypePipe,
    ManufacturerModalComponent,
    CompanyModalComponent,
    ParkingModalComponent,
    ChartCounterBgComponent,
    BeautifyCheckboxComponent,
    BeautifyRadioComponent,
    BeautifyRadioComponent,
    InputSelectorComponent,
    PayTypePipe,
    OpenTypePipe,
    ZeroFillPipe,
    ScreenParkingStatePipe,
    MagicNumberItemComponent,
    MagicNumberComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ShareModule {
}
