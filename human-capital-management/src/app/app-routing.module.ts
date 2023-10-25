import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { LayoutComponentComponent } from './components/layout-component/layout-component.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { RequestLeaveComponent } from './components/request-leave/request-leave.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component'
import { CreateUserPageComponent } from './components/create-user-page/create-user-page.component';

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
      {
        path: "app",
        component: LayoutComponentComponent,
        children: [
          { path: "home", component: HomePageComponent },
          { path: "search", component: SearchComponent },
          { path: "addUser", component: CreateUserPageComponent },
          { path: "dashboard", component: DashboardComponent },
          { path: "profile", component: ProfileComponent },
        ]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
