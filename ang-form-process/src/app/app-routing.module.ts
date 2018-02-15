import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

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
