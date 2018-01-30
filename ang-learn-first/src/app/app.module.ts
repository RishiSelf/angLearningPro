import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

import { landingScreenComponent } from './landingScreens/landing-screen/landing-screen.component';
import { HomeCompComponent } from './landingScreens/home-comp/home-comp.component';
import { HeaderCompComponent } from './landingScreens/header-comp/header-comp.component';
import { AboutusCompComponent } from './landingScreens/aboutus-comp/aboutus-comp.component';
import { ContactusCompComponent } from './landingScreens/contactus-comp/contactus-comp.component';
import { LoginScreenComponent } from './landingScreens/user-authentication/login-screen/login-screen.component';
import { RegisterScreenComponent } from './landingScreens/user-authentication/register-screen/register-screen.component';

import { DashBoardHomeComponent } from './innerScreens/dash-board-home/dash-board-home.component';
import { LeftSidebarComponent } from './innerScreens/left-sidebar/left-sidebar.component';
import { DashboardScreenComponent } from './innerScreens/dashboard-screen/dashboard-screen.component';
import { ProfileScreenComponent } from './innerScreens/profile-screen/profile-screen.component';
import { EventsScreenComponent } from './innerScreens/events-screen/events-screen.component';
import { ActivitiesScreenComponent } from './innerScreens/activities-screen/activities-screen.component';
import { InnerDashboardHeaderComponent } from './innerScreens/inner-dashboard-header/inner-dashboard-header.component';
import { DynamicDataTableComponent } from './dynamic-data-table/dynamic-data-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    landingScreenComponent,
    HomeCompComponent,
    HeaderCompComponent,
    AboutusCompComponent,
    ContactusCompComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    DashBoardHomeComponent,
    LeftSidebarComponent,
    DashboardScreenComponent,
    ProfileScreenComponent,
    EventsScreenComponent,
    ActivitiesScreenComponent,
    InnerDashboardHeaderComponent,
    DynamicDataTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
