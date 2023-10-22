//modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from "@angular/forms"
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material imports
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button"
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule} from "@angular/material/select";

//components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutComponentComponent } from './components/layout-component/layout-component.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { RequestLeaveComponent } from './components/request-leave/request-leave.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component'
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { ProfileSectionComponent } from './components/profile/profile-section/profile-section.component';
//reducers
import { loginReducer } from './store/loginReducer/login.reducer';
import { userCollectionReducer } from './store/userCollectionReducer/user-collection.reducer';
import { countryDetailsReducer } from './store/countryDetailsReducer/country-details.reducer';
import { workforceDetailsReducer } from './store/workforceDetailsReducer/workforceDetails.reducer';
//custom validators
import { LettersOnlyDirective } from './customValidators/letters-only-validator.directive';
import { YearValidatorDirective } from './customValidators/year-validator.directive';
import { RecentDateValidatorDirective } from './customValidators/recent-date-validator.directive';
import { PasswordValidatorDirective } from './customValidators/password-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavigationComponent,
    LayoutComponentComponent,
    HomePageComponent,
    SearchComponent,
    RequestLeaveComponent,
    DashboardComponent,
    ProfileComponent,
    CreateUserFormComponent,
    LettersOnlyDirective,
    YearValidatorDirective,
    RecentDateValidatorDirective,
    ProfileSectionComponent,
    PasswordValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    StoreModule.forRoot({
      loggedUser: loginReducer,
      userCollection: userCollectionReducer,
      countryDetails: countryDetailsReducer,
      workforceDetails: workforceDetailsReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true // If set to true, the connection is established outside the Angular zone for better performance
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }