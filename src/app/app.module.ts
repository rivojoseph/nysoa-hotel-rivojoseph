import {NgModule, OnInit, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PublicModule} from "./public/public.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PagenotfoundComponent } from './_utils/pagenotfound/pagenotfound.component';
import {CommonModule, DatePipe} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TokenInterceptorProvide} from "./_helper/token.interceptor";
import { StatComponent } from './_stat/stat/stat.component';

import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

FullCalendarModule.bind([
  interactionPlugin,
  dayGridPlugin,
])
@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    StatComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FullCalendarModule,
    DatePipe

  ],
  providers: [TokenInterceptorProvide,DatePipe],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
