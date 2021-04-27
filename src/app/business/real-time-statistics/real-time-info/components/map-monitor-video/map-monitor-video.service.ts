import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/http.service';
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../../../environments/environment";

@Injectable()
export class MapMonitorVideoService {

  private readonly AppKey = '1e643ad8dbec41c99883232375e74a40';
  private readonly Secret = '8fe01c944e501ca2d0d855874493ccae';
  private accessToken: string;

  constructor(private httpService: HttpService) {
  }

  /**
   * 刷新token信息
   * @returns {Observable<string>}
   */
  private refreshToken(): Observable<string> {
    if (this.accessToken) {
      return Observable.of(this.accessToken);
    } else {
      const params = {
        appKey: this.AppKey,
        appSecret: this.Secret
      };
      return this.httpService.get(environment.CIPP_UNIVERSE + '/api/lapp/token/get', params).map((res: any) => {
        this.accessToken = res.json().accessToken;
        return this.accessToken;
      });
    }
  }

  /**
   * 获取直播视频地址
   * @param {Array<string>} serialNumber:channel
   * @returns {Observable<string>}
   */
  public requestDeviceUrl(sources: Array<string>): Observable<Array<string>> {
    return Observable.create(observer => {
      if (this.accessToken) {
        const params = {
          accessToken: this.accessToken,
          source: sources.join(','),
        };
        this.httpService.get(environment.CIPP_UNIVERSE + '/api/lapp/live/address/get', params).subscribe((resA: any) => {
          const dataA = resA.json();
          if (dataA.code === '200') {
            observer.next(dataA.data.map(item => item.hlsHd));
            observer.complete();
          } else if (dataA.code === '10002') {
            this.accessToken = null;
            this.refreshToken().subscribe(() => {
              this.requestDeviceUrl(sources).subscribe((resB: any) => {
                const dataB = resB.json();
                if (dataB.code === '200') {
                  observer.next(dataB.data.map(item => item.hlsHd));
                  observer.complete();
                } else {
                  observer.error(dataB);
                }
              });
            });
          } else {
            observer.error(dataA);
          }
        });
      } else {
        this.refreshToken().subscribe(() => {
          this.requestDeviceUrl(sources).subscribe((resC: any) => {
            observer.next(resC);
            observer.complete();
          }, err => {
            observer.error(err);
          });
        });
      }
    });
  }
}
