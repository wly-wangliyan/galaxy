import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'rxjs';
import 'rxjs/Rx';
import {initializer} from './initializer';

if (environment.production) {
  enableProdMode();
}

initializer.boot(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
