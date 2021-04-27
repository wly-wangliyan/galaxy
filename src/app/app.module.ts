import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {LoginComponent} from './business/login/login.component';
import {HomeComponent} from './business/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {AuthGuardService} from './core/auth-guard.service';
import {AuthService} from './core/auth.service';
import {HttpService} from './core/http.service';
import {BasicsComponent} from './business/basics/basics.component';
import {RouteMonitorService} from './core/route-monitor.service';
import {ShareModule} from './share/share.module';
import {GlobalService} from './core/global.service';
import {EntryComponent} from './entry/entry.component';
import {RegionHttpService} from './core/region-http.service';
import {RoutePreventService} from './core/route-prevent.service';
import {SearchSelectorService} from './share/components/search-selector/search-selector.service';
import {GroupsHttpService} from './business/groups/groups-http.service';
import {environment} from '../environments/environment';
import * as Raven from 'raven-js';

export class RavenErrorHandler implements ErrorHandler {
  constructor() {
    switch (environment.version) {
      case 'd':
        Raven
          .config('https://d9af79aca9f3425cb47d97984747e880@guard.uucin.com/106')
          .install();
        break;
      case 'r':
        Raven
          .config('https://6306743890b141f29a4114bb068d8db4@guard.uucin.com/108')
          .install();
        break;
      case 'p':
        Raven
          .config('https://52d1753a367d4c4c9c81f202dc61bfa7@guard.uucin.com/109')
          .install();
        break;
      case 'y':
        Raven
          .config('https://ad6edfc0b927456ab20b67230848405f@guard.uucin.com/110')
          .install();
        break;
    }
  }

  public handleError(err: any): void {
    if (environment.version === 'd' ||
      environment.version === 'p' ||
      environment.version === 'y' ||
      environment.version === 'r') {
      // 部署到服务器上的版本才生成日志
      Raven.captureException(err);
    }
    throw err;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BasicsComponent,
    EntryComponent,
  ],
  imports: [
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ShareModule,
  ],
  providers: [HttpService,
    AuthService,
    AuthGuardService,
    RoutePreventService,
    RouteMonitorService,
    RegionHttpService,
    GroupsHttpService,
    GlobalService,
    SearchSelectorService,
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ],
  bootstrap: [EntryComponent]
})
export class AppModule {
}
