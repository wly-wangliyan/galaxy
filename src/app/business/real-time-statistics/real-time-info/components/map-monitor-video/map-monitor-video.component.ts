import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MapMonitorVideoService} from './map-monitor-video.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const Video16_9 = '16:9';
const Video11_9 = '11:9';
type VideoSize = '16:9' | '11:9';

@Component({
  selector: 'app-map-monitor-video',
  templateUrl: './map-monitor-video.component.html',
  styleUrls: ['./map-monitor-video.component.css'],
  providers: [MapMonitorVideoService]
})
export class MapMonitorVideoComponent implements OnInit {

  private videoPlayerA: any;
  private videoPlayerB: any;
  public videoUrlA: any;
  public videoUrlB: any;

  public showVideoView = false;

  private deviceList: Array<string> = ['C56508058:1', 'C56507328:1', 'C56507833:1', 'C56507807:1', 'C31007485:1', '171628097:1'];
  private currentSize: VideoSize = Video16_9;

  private urlList: Array<string> = [];
  private readySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Input() set videoSources(videoSources: Array<string>) {
    if (videoSources && videoSources.length > 0) {
      this.videoUrlA = videoSources[0];
      this.videoUrlB = videoSources[1];
    } else {
      this.destroyVideos();
      this.videoUrlA = null;
      this.videoUrlB = null;
    }
  }

  @Output() public closeButtonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private videoService: MapMonitorVideoService) {
  }

  public ngOnInit() {
    this.videoService.requestDeviceUrl(this.deviceList).subscribe(urlList => {
      // 获取配置好的视频地址
      this.urlList = urlList;
      this.readySubject.next(true);
    });
  }

  private resetVideos(videoSize?: VideoSize) {
    if (videoSize) {
      this.currentSize = videoSize;
    }
    const videoHeight = this.currentSize === Video16_9 ? 243 : 354;
    if (this.videoUrlA) {
      $('#liveAContainer')[0].innerHTML = `<video id="liveA" width="432" height="${videoHeight}" muted playsInline webkit-playsinline autoplay>
        <source src="${this.videoUrlA}" type='application/x-mpegURL'>
        <p class="vjs-no-js">播放视频需要启用JavaScript，推荐使用支持HTML5的浏览器访问。
          To view this video please enable JavaScript,
          and consider upgrading to a web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video</a>
        </p>
      </video>`;
      Observable.timer(0).subscribe(() => {
        if (this.videoPlayerA) {
          this.videoPlayerA.pause();
        }
        this.videoPlayerA = new EZUIPlayer('liveA');
      });
    }
    if (this.videoUrlB) {
      $('#liveBContainer')[0].innerHTML = `<video id="liveB" width="432" height="${videoHeight}" muted playsInline webkit-playsinline autoplay>
        <source src="${this.videoUrlB}" type='application/x-mpegURL'>
        <p class="vjs-no-js">播放视频需要启用JavaScript，推荐使用支持HTML5的浏览器访问。
          To view this video please enable JavaScript,
          and consider upgrading to a web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video</a>
        </p>
      </video>`;
      Observable.timer(0).subscribe(() => {
        if (this.videoPlayerB) {
          this.videoPlayerB.pause();
        }
        this.videoPlayerB = new EZUIPlayer('liveB');
      });
    }
  }

  private destroyVideos() {
    try {
      $('#liveAContainer')[0].innerHTML = '';
      $('#liveBContainer')[0].innerHTML = '';
      if (this.videoPlayerA) {
        this.videoPlayerA.pause();
        this.videoPlayerA.hls.destroy();
        this.videoPlayerA.video = null;
        this.videoPlayerA.hls = null;
      }

      if (this.videoPlayerB) {
        this.videoPlayerB.pause();
        this.videoPlayerB.hls.destroy();
        this.videoPlayerB.video = null;
        this.videoPlayerB.hls = null;
      }
      this.videoPlayerA = null;
      this.videoPlayerB = null;
    } catch (ex) {
      // 过滤异常
    }
  }

  public onCloseButtonClick() {
    this.closeButtonClick.emit();
    this.close();
  }

  /**
   * 打开视频窗口
   * @param {Array<string>} videoSources 视频源数组(支持单双摄像头)
   * @param videoSize 视频尺寸
   */
  public open(videoSize: VideoSize, videoSources?: Array<string>) {
    if (videoSources) {
      this.videoSources = videoSources;
      this.videoUrlA = videoSources[0];
      this.videoUrlB = videoSources[1];
    }
    Observable.timer(0).subscribe(() => {
      this.showVideoView = true;
      this.resetVideos(videoSize);
    });
  }

  /**
   * 重置视频显示
   */
  public reset() {
    this.destroyVideos();
    this.resetVideos();
  }

  /**
   * 关闭视频显示
   */
  public close() {
    this.showVideoView = false;
    this.destroyVideos();
  }

  /**
   * 当视频数据准备好后可以调用视频播放
   * @returns {Observable<boolean>}
   */
  public ready(): Observable<boolean> {
    return this.readySubject.asObservable();
  }

  /**
   * 临时对应
   * @param {"a" | "b"} word
   */
  public openTmp(word: 'a' | 'b' | 'c') {
    if (word === 'a') {
      // 玖伍 （路外）
      this.open(Video16_9, [this.urlList[2], this.urlList[1]]);
    } else if (word === 'b') {
      // 昂立  （路外）
      this.open(Video16_9, [this.urlList[4], this.urlList[5]]);
    } else if (word === 'c') {
      // 团结路（东软）（路内）
      this.open(Video11_9, ['http://hls.open.ys7.com/openlive/1bf8bf69ae83445784a2048524a1298b.m3u8',
        'http://alhlsgw.lechange.com:9001/LCO/4G0654FPAN78BE8/0/1/20181018145048/dev_20181018145048_mmk6a8tq91z0cdxh.m3u8']);
    }
  }
}
