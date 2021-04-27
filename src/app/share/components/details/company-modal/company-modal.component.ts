import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {
  OperationCompanyHttpService
} from '../../../../business/basics/operation-company/operation-company-http.service';
import {GlobalService} from '../../../../core/global.service';
import {Subscription} from 'rxjs/Subscription';
import {CompanyEntity} from '../../../../business/basics/operation-company/operation-company.model';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.css' , '../common-css-detail-modal.css'],
  providers: [OperationCompanyHttpService]
})
export class CompanyModalComponent implements OnDestroy {

  @ViewChild('viewDetailModal')public viewDetailModal: ElementRef;

  private cancelSubscription: Subscription;

  public company: CompanyEntity = new CompanyEntity();

  private isLoading = false;

  constructor(private companyHttpService: OperationCompanyHttpService, private globalService: GlobalService) {
  }

  public ngOnDestroy() {
    this.cancelSubscription && this.cancelSubscription.unsubscribe();
  }

  /**
   * 查看详情
   * @param {string} company_id 物业公司id
   */
  public showDetail(company_id: string) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;

    this.cancelSubscription && this.cancelSubscription.unsubscribe();
    this.cancelSubscription = this.companyHttpService.requestCompanyByIdData(company_id).subscribe(entity => {
      this.company = entity;
      $(this.viewDetailModal.nativeElement).modal('show');
      this.isLoading = false;
    }, err => {
      this.globalService.httpErrorProcess(err);

      this.isLoading = false;
    });
  }
}
