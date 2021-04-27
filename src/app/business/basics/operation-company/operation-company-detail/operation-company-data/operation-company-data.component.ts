import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OperationCompanyHttpService} from '../../operation-company-http.service';
import {GlobalService} from '../../../../../core/global.service';
import {HttpErrorEntity} from '../../../../../core/http.service';
import {CompanyEntity} from '../../operation-company.model';

@Component({
  selector: 'app-operation-company-data',
  templateUrl: './operation-company-data.component.html',
  styleUrls: ['../../../basics.component.css', './operation-company-data.component.css']
})
export class OperationCompanyDataComponent implements OnInit {

  public companyInfo: CompanyEntity = new CompanyEntity();

  public companyId: string;

  constructor(private route: ActivatedRoute, private operationCompanyHttpService: OperationCompanyHttpService, private globalService: GlobalService) {
    this.route.parent.params.subscribe(params => {
      this.companyId = params['company_id'];
    });
  }

  public ngOnInit() {
    this.requestCompanyByIdData();
  }

  // 查询运营公司详情
  public requestCompanyByIdData() {
    this.operationCompanyHttpService.requestCompanyByIdData(this.companyId).subscribe(data => {
      this.companyInfo = data;
    }, err => {
      if (!this.globalService.httpErrorProcess(err)) {
        if (err.status === 422) {
          const error: HttpErrorEntity = HttpErrorEntity.Create(err.json());

          for (const content of error.errors) {
            if (content.field === 'company_name' && content.code === 'missing_field') {
              this.globalService.promptBox.open('公司名称参数缺失！');
              return;
            } else if (content.field === 'region_id' && content.code === 'invalid') {
              this.globalService.promptBox.open('省市区code无效或不合法！');
              return;
            }
          }
        }
      }
    });
  }
}
