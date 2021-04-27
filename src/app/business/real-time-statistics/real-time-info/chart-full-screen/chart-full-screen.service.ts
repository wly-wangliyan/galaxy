import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from '../../../../core/global.service';

@Injectable()
export class ChartFullScreenService {

  private count = 0;
  private timerSubscription: Subscription;
  private _timer_5seconds: EventEmitter<any> = new EventEmitter();
  private _timer_10seconds: EventEmitter<any> = new EventEmitter();
  private _timer_30seconds: EventEmitter<any> = new EventEmitter();
  private _timer_1minutes: EventEmitter<any> = new EventEmitter();
  private _timer_5minutes: EventEmitter<any> = new EventEmitter();
  private _timer_60minutes: EventEmitter<any> = new EventEmitter();
  private _timer_9oclock: EventEmitter<any> = new EventEmitter();
  private is_timer_9oclock_emit = false;

  constructor(private globalService: GlobalService) {
  }

  public get timer_5seconds(): Observable<any> {
    return this._timer_5seconds.asObservable();
  }

  public get timer_10seconds(): Observable<any> {
    return this._timer_10seconds.asObservable();
  }

  public get timer_30seconds(): Observable<any> {
    return this._timer_30seconds.asObservable();
  }

  public get timer_1minutes(): Observable<any> {
    return this._timer_1minutes.asObservable();
  }

  public get timer_5minutes(): Observable<any> {
    return this._timer_5minutes.asObservable();
  }

  public get timer_60minutes(): Observable<any> {
    return this._timer_60minutes.asObservable();
  }

  /* 每天9点 */
  public get timer_9oclock(): Observable<any> {
    return this._timer_9oclock.asObservable();
  }

  /**
   * 启动timer
   */
  public startTimer() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
    this.timerSubscription = Observable.interval(1000 * 5).subscribe(() => {
      // 每5s触发一次数据刷新
      this.count++;
      this._timer_5seconds.emit();
      if (this.count * 5 % 2 === 0) {
        this._timer_10seconds.emit();
      }
      if (this.count * 5 % 6 === 0) {
        this._timer_30seconds.emit();
      }
      if (this.count * 5 % 12 === 0) {
        this._timer_1minutes.emit();
      }
      if (this.count * 5 % 60 === 0) {
        this._timer_5minutes.emit();
      }
      if (this.count * 5 % (60 * 12) === 0) {
        this._timer_60minutes.emit();
      }
      // 每天9点发射一次
      if (!this.is_timer_9oclock_emit && new Date(this.globalService.timeStamp * 1000).getHours() === 9) {
        this._timer_9oclock.emit();
        this.is_timer_9oclock_emit = true;
      } else if (this.is_timer_9oclock_emit && new Date(this.globalService.timeStamp * 1000).getHours() !== 9) {
        this.is_timer_9oclock_emit = false;
      }
    });
  }

  /**
   * 停止timer
   */
  public stopTimer() {
    this.timerSubscription && this.timerSubscription.unsubscribe();
  }
}
