import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";

import {Camera} from "@ionic-native/camera/ngx"
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
import { ExamplesList } from './text/examples/examples';

@NgModule({
  declarations: [AppComponent, ExamplesList],
  entryComponents: [ExamplesList],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SpeechRecognition
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
