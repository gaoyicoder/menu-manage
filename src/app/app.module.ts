import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BLE } from '@ionic-native/ble/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule, Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';
import { AppService } from './services/app.service';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/File/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Media } from '@ionic-native/media/ngx';

import { MenuPopComponent } from './components/menu-pop/menu-pop.component';
import { OrderPopComponent } from './components/order-pop/order-pop.component';
import { GuestPopComponent } from './components/guest-pop/guest-pop.component';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => { 
      return UserService.getTokenPromise(storage);
    },
    whitelistedDomains:['backend.gaoyicoder.com', 'backenddev.gaoyicoder.com'],
  }
}

@NgModule({
  declarations: [AppComponent, MenuPopComponent, OrderPopComponent, GuestPopComponent],
  entryComponents: [MenuPopComponent, OrderPopComponent, GuestPopComponent],
  imports: [
	  BrowserModule, 
	  IonicModule.forRoot(), 
	  AppRoutingModule,
	  IonicStorageModule.forRoot(),
	  HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppService,
    Camera,
    Insomnia,
    Media,
    WebView,
    FileTransfer,
    FileTransferObject,
    File,
    BLE,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
