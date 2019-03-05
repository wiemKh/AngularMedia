import { BrowserModule } from '@angular/platform-browser';
//import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MomentModule } from "angular2-moment";
import { AngularMediaModule } from 'angular-media';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  //  CommonModule,
    BrowserModule,
    MomentModule,
    AngularMediaModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
