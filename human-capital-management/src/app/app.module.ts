//modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule} from '@angular/material/core';

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
import { CreateUserFormComponent } from './components/create-user-page/create-user-form/create-user-form.component';
import { ProfileSectionComponent } from './components/profile/profile-section/profile-section.component';
import { CreateUserPageComponent } from './components/create-user-page/create-user-page.component';
import { AddCompanyDetailsFormComponent } from './components/create-user-page/add-company-details-form/add-company-details-form.component';
import { UserDetailsCardComponent } from './components/user-details-card/user-details-card.component';
import { DisplayUserPageComponent } from './components/display-user-page/display-user-page.component';
import { UserCollectionTableComponent } from './components/search/user-collection-table/user-collection-table.component';
import { UpdateUserInfoDialogComponent } from './components/display-user-page/update-user-info-dialog/update-user-info-dialog.component';
import { ResetUserPasswordDialogComponent } from './components/display-user-page/reset-user-password-dialog/reset-user-password-dialog.component';
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
import { DeleteUserDialogComponent } from './components/display-user-page/delete-user-dialog/delete-user-dialog.component';
import { LeaveRequestFormComponent } from './components/profile/leave-request-form/leave-request-form.component';
import { leaveRequestsCollectionReducer } from './store/leaveRequestsCollectionReducer/leaveRequestsCollection.reducer';
import { LeaveRequestDetailsDialogComponent } from './components/dashboard/leave-request-details-dialog/leave-request-details-dialog.component';
import { PersonalLeaveRequestsTableComponent } from './components/profile/personal-leave-requests-table/personal-leave-requests-table.component';

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
    AddCompanyDetailsFormComponent,
    CreateUserPageComponent,
    UserDetailsCardComponent,
    DisplayUserPageComponent,
    UpdateUserInfoDialogComponent,
    ResetUserPasswordDialogComponent,
    UserCollectionTableComponent,
    DeleteUserDialogComponent,
    LeaveRequestFormComponent,
    LeaveRequestDetailsDialogComponent,
    PersonalLeaveRequestsTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot({
      loggedUser: loginReducer,
      userCollection: userCollectionReducer,
      countryDetails: countryDetailsReducer,
      workforceDetails: workforceDetailsReducer,
      leaveRequestsCollection: leaveRequestsCollectionReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: !isDevMode(), 
      autoPause: true, 
      trace: false, 
      traceLimit: 75, 
      connectOutsideZone: true 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }