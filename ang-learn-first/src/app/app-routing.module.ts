import { NgModule } from '@angular/core';

import { landingScreenComponent } from './landingScreens/landing-screen/landing-screen.component';
import { HomeCompComponent } from './landingScreens/home-comp/home-comp.component';
import { HeaderCompComponent } from './landingScreens/header-comp/header-comp.component';
import { AboutusCompComponent } from './landingScreens/aboutus-comp/aboutus-comp.component';
import { ContactusCompComponent } from './landingScreens/contactus-comp/contactus-comp.component';
import { LoginScreenComponent } from './landingScreens/user-authentication/login-screen/login-screen.component';
import { RegisterScreenComponent } from './landingScreens/user-authentication/register-screen/register-screen.component';
import { DynamicDataTableComponent } from './dynamic-data-table/dynamic-data-table.component';

import { DashBoardHomeComponent } from './innerScreens/dash-board-home/dash-board-home.component';
import { LeftSidebarComponent } from './innerScreens/left-sidebar/left-sidebar.component';
import { DashboardScreenComponent } from './innerScreens/dashboard-screen/dashboard-screen.component';
import { ProfileScreenComponent } from './innerScreens/profile-screen/profile-screen.component';
import { EventsScreenComponent } from './innerScreens/events-screen/events-screen.component';
import { ActivitiesScreenComponent } from './innerScreens/activities-screen/activities-screen.component';
import { InnerDashboardHeaderComponent } from './innerScreens/inner-dashboard-header/inner-dashboard-header.component';


import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'landingScreen',
        component: landingScreenComponent,
        children: [
            {
                path: 'homepage',
                component: HomeCompComponent
            },
            {
                path: 'aboutpage',
                component: AboutusCompComponent
            },
            {
                path: 'contactpage',
                component: ContactusCompComponent
            },
            {
                path: 'datatablepage',
                component: DynamicDataTableComponent
            },
            {
                path: 'loginPage',
                component: LoginScreenComponent
            },
            {
                path: 'registerPage',
                component: RegisterScreenComponent
            }
        ]
    },
    {
        path: 'dashboardScreen',
        component: DashBoardHomeComponent,
        children: [
            {
                path: 'dashboardpage',
                component: DashboardScreenComponent
            },
            {
                path: 'profilepage',
                component: ProfileScreenComponent
            },
            {
                path: 'eventspage',
                component: EventsScreenComponent
            },
            {
                path: 'activitiespage',
                component: ActivitiesScreenComponent
            },
            {
                path: '',
                redirectTo : 'dashboardpage',
                pathMatch: 'full'
            }
        ]
    },

    {
        path: '',
        redirectTo : 'landingScreen/homepage',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }