import {Component, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {BeianHttpService} from '../../../../business/beian/beian-http.service';
import {
  ManufacturerHttpService
} from '../../../../business/basics/manufacturer/manufacturer-http.service';
import {Subscription} from 'rxjs/Subscription';
import {GlobalService} from '../../../../core/global.service';
import {ManufacturerEntity} from '../../../../business/basics/manufacturer/manufacturer.model';

@Component({
  selector: 'app-manufacturer-modal',
  templateUrl: './manufacturer-modal.component.html',
  styleUrls: ['./manufacturer-modal.component.css' , '../common-css-detail-modal.css'],
  providers: [BeianHttpService, ManufacturerHttpService]
})
export class ManufacturerModalComponent implements OnDestroy {
  @ViewChild('viewDetailModal') public viewDetailModal: ElementRef;
  private cancelSubscription: Subscription;
  public manufacturer: ManufacturerEntity = new ManufacturerEntity();

  private isLoading = false;
  constructor(private manufacturerHttpService: ManufacturerHttpService, private globalService: GlobalService) {
  }

  public ngOnDestroy() {
    this.cancelSubscription && this.cancelSubscription.unsubscribe();
  }
  /**
   * 查看详情
   * @param {string} company_id 物业公司id
   */
  public showDetail(manufacturer_id: string) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;

    this.cancelSubscription && this.cancelSubscription.unsubscribe();
    this.cancelSubscription = this.manufacturerHttpService.requestManufacturerById(manufacturer_id).subscribe(entity => {
      this.manufacturer = entity;
      $(this.viewDetailModal.nativeElement).modal('show');
      this.isLoading = false;
    }, err => {
      this.globalService.httpErrorProcess(err);

      this.isLoading = false;
    });
  }

}
