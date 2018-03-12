import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { Ng2FileRequiredModule } from 'ng2-file-required';
import { AssignmentHomeComponent } from './assignment-home/assignment-home.component';

import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PersonalInfoComponent } from './create-account/personal-info/personal-info.component';
import { AcceptApplicationComponent } from './accept-application/accept-application.component';
import { RejectApplicationComponent } from './reject-application/reject-application.component';

/*** Assignment 01 Components ***/
import { AssignmentTwoLandingComponent } from './assignment-two-landing/assignment-two-landing.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { ApproverAccountComponent } from './approver-account/approver-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingScreenComponent,
    TermsConditionComponent,
    CreateAccountComponent,
    PersonalInfoComponent,
    AcceptApplicationComponent,
    RejectApplicationComponent,
    AssignmentHomeComponent,
    AssignmentTwoLandingComponent,
    UserAccountComponent,
    ApproverAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Ng2FileRequiredModule
    // countryPhoneCodeList
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
