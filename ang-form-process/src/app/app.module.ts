import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PersonalInfoComponent } from './create-account/personal-info/personal-info.component';
import { EmploymentInfoComponent } from './create-account/employment-info/employment-info.component';
import { AccountTypeInfoComponent } from './create-account/account-type-info/account-type-info.component';
import { DocumentationInfoComponent } from './create-account/documentation-info/documentation-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingScreenComponent,
    TermsConditionComponent,
    CreateAccountComponent,
    PersonalInfoComponent,
    EmploymentInfoComponent,
    AccountTypeInfoComponent,
    DocumentationInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
