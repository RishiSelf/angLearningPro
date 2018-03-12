import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

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

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'assignmentHomeScreen',
    component: AssignmentHomeComponent
  },
  {
    path: 'assignmentTwoHomeScreen',
    component: AssignmentTwoLandingComponent
  },
  {
    path: 'userAccountScreen',
    component: UserAccountComponent
  },
  {
    path: 'approverAccountScreen',
    component: ApproverAccountComponent
  },
  {
    path: 'landingScreen',
    component: LandingScreenComponent
  },
  {
    path: 'termsConditionScreen',
    component: TermsConditionComponent
  },
  {
    path: 'createAccountScreen',
    component: CreateAccountComponent,
    children : [
      {
        path: 'personalInfoForm',
        component: PersonalInfoComponent
      },
      {
          path: '',
          redirectTo : 'personalInfoForm',
          pathMatch: 'full'
      }
    ]
  },
  {
    path: 'acceptApplicationRequest',
    component: AcceptApplicationComponent
  },
  {
    path: 'rejectApplicationRequest',
    component: RejectApplicationComponent
  },

  {
       path: '',
       redirectTo : 'assignmentHomeScreen',
       pathMatch: 'full'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
