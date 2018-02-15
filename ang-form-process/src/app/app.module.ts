import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingScreenComponent,
    TermsConditionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
