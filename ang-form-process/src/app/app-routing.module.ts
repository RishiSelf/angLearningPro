import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PersonalInfoComponent } from './create-account/personal-info/personal-info.component';
import { EmploymentInfoComponent } from './create-account/employment-info/employment-info.component';
import { AccountTypeInfoComponent } from './create-account/account-type-info/account-type-info.component';
import { DocumentationInfoComponent } from './create-account/documentation-info/documentation-info.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
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
        path: 'employmentInfoForm',
        component: EmploymentInfoComponent
      },
      {
        path: 'accountTypeForm',
        component: AccountTypeInfoComponent
      },
      {
        path: 'documentationInfoForm',
        component: DocumentationInfoComponent
      },
      {
          path: '',
          redirectTo : 'personalInfoForm',
          pathMatch: 'full'
      }
    ]
  },

  {
       path: '',
       redirectTo : 'landingScreen',
       pathMatch: 'full'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
