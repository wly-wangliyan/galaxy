import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpService, LinkResponse} from '../../../core/http.service';
import {Observable} from 'rxjs/Observable';
import {FileUpdate} from '../../../../utils/file-update';
import {CompaniesSearchParams, CompanyEntity, FuzzySearchCompaniesParams} from './operation-company.model';
import {CompanyParkingBeianEntity, ParkingBeianSearchParams} from '../../beian/beian.model';

@Injectable()
export class OperationCompanyHttpService {

  private domain = environment.CIPP_UNIVERSE;

  constructor(private httpService: HttpService) {
  }

  /**
   * 查看物业公司列表
   * @param searchParams
   * @returns {Observable<R>}
   */
  public requestCompaniesData(searchParams: CompaniesSearchParams): Observable<CompaniesLinkResponse> {
    const url = this.domain + '/companies';
    const params = this.httpService.generateURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new CompaniesLinkResponse(data));
  }

  /**
   * 通过link查看物业公司列表
   * @param url
   * @returns {Observable<R>}
   */
  public continueCompaniesData(url: string): Observable<CompaniesLinkResponse> {
    return this.httpService.get(url).map(data => new CompaniesLinkResponse(data));
  }

  /**
   * 查询物业公司详情
   * @param companyId
   * @returns {Observable<R>}
   */
  public requestCompanyByIdData(companyId: string): Observable<CompanyEntity> {
    const url = this.domain + '/companies/' + companyId;
    return this.httpService.get(url).map(data => CompanyEntity.Create(data.json()));
  }

  /**
   * 名称模糊检索物业公司
   * @param searchParams
   * @returns {OperatorFunction<T, R>}
   */
  public requestFuzzySearchCompaniesData(searchParams: FuzzySearchCompaniesParams): Observable<CompaniesLinkResponse> {
    const url = this.domain + '/companies/association';
    const params = this.httpService.generateURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new CompaniesLinkResponse(data));
  }

  /**
   * 上传图片
   * @param file
   * @returns {any}
   */
  public requestUploadPicture(file: any, imgIndex: any): Observable<any> {
    const url = environment.CIPP_UNIVERSE + '/storages/images';
    return Observable.create(observer => {
      FileUpdate(file, url, (upProgress) => {
        if (upProgress.lengthComputable) {
          /**
           * upProgress.loaded：文件上传的大小
           * upProgress.total：文件总的大小
           */
          const percentComplete = Math.round((upProgress.loaded) * 100 / upProgress.total);
          observer.next({'imgIndex': imgIndex, 'upProgress': percentComplete});
        }
      }, (sourceUrl) => {
        observer.next({'sourceUrl': sourceUrl});
        observer.complete();
      }, (err) => {
        observer.error(err);
      });
    });
  }

  /**
   * 查询运营公司的停车场备案信息列表
   * @param searchParams 参数列表
   * @param company_id 物业公司id
   * @returns {Observable<R>}
   */
  public requestParkingBeianList(searchParams: ParkingBeianSearchParams, company_id: string): Observable<ParkingBeiansLinkResponse> {
    const url = this.domain + `/companies/${company_id}/parking_beians`;
    const params = this.httpService.generateListURLSearchParams(searchParams);
    return this.httpService.get(url, params).map(data => new ParkingBeiansLinkResponse(data));
  }

  /**
   * 通过link查询运营公司的停车场备案信息列表
   * @param url
   * @returns {Observable<R>}
   */
  public continueParkingBeianList(url: string): Observable<ParkingBeiansLinkResponse> {
    return this.httpService.get(url).map(data => new ParkingBeiansLinkResponse(data));
  }
}

export class CompaniesLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<CompanyEntity> {
    const tempList: Array<CompanyEntity> = [];
    results.forEach(res => {
      tempList.push(CompanyEntity.Create(res));
    });
    return tempList;
  }
}


export class ParkingBeiansLinkResponse extends LinkResponse {
  public generateEntityData(results: Array<any>): Array<CompanyParkingBeianEntity> {
    const tempList: Array<CompanyParkingBeianEntity> = [];
    results.forEach(res => {
      tempList.push(CompanyParkingBeianEntity.Create(res));
    });
    return tempList;
  }
}
