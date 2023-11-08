import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { countryDetailsInterface } from 'src/app/interfaces/countryDetails.interface';
import { Observable, Subject, take, takeUntil } from "rxjs"
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { selectCountryDetails } from 'src/app/store/countryDetailsReducer/country-details.selectors';
import { selectAllDepartments, selectAllPositions } from 'src/app/store/workforceDetailsReducer/workforceDetails.selectors';
import { selectAllManagers, selectUserByExistingEmail, selectUserByExistingNumber } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';
import { User } from 'src/app/model/user';
import { addUser } from 'src/app/store/userCollectionReducer/user-collection.actions';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {
  emailFlag = false;
  phoneNumberFlag = false;

  countryDetails$: Observable<countryDetailsInterface> = new Observable();
  allPositions$: Observable<string[]> = new Observable();
  allDepartments$: Observable<string[]> = new Observable();
  allManagers$: Observable<{ id: number, firstName: string, lastName: string }[]> = new Observable();
  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();

  countriesOptions: string[] = [];
  nationalitiesOptions: string[] = [];
  currenciesOptions: string[] = [];
  allPositions: string[] = [];
  allDepartments: string[] = [];
  allManagers: { id: number, firstName: string, lastName: string }[] = [];
  loggedUser!: loggedUSerInterface | null;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<StoreInterface>,
    private snackbar: CustomMaterialSnackbarComponent
  ) { }

  ngOnInit() {
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUser = data;
    })

    this.countryDetails$ = this.store.select(selectCountryDetails);
    this.countryDetails$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.countriesOptions = data.countries;
      this.nationalitiesOptions = data.nationalities;
      this.currenciesOptions = data.currencies
    });

    this.allPositions$ = this.store.select(selectAllPositions);
    this.allPositions$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allPositions = data
    });

    this.allDepartments$ = this.store.select(selectAllDepartments);
    this.allDepartments$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allDepartments = data
    });

    this.allManagers$ = this.store.select(selectAllManagers);
    this.allManagers$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allManagers = data;
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: NgForm) {
    this.emailFlag = false;
    this.phoneNumberFlag = false;

    const { email, password, firstName, lastName, phoneNumber, birthDate, startingDate,
      sex, nationality, country, salary, currency, department, position, permission } = form.value;
    let directManagerID: number | null;
    let manager: boolean;

    form.value.directManagerID !== undefined ? directManagerID
      = form.value.directManagerID : directManagerID = null;
    position === "manager" ? manager = true : manager = false;

    const newUser = new User(email, password, firstName, lastName,
      phoneNumber, birthDate, startingDate, sex, nationality, country,
      salary, currency, department, directManagerID, position, manager, permission);

    this.store.select(store => selectUserByExistingEmail(store, newUser.email, newUser.id))
      .pipe(take(1)).subscribe(data => {
        if (data === true) {
          this.emailFlag = true;
        }
      })

    this.store.select(store => selectUserByExistingNumber(store, newUser.phoneNumber, newUser.id))
      .pipe(take(1)).subscribe(data => {
        if (data === true) {
          this.phoneNumberFlag = true;
        }
      })

    if (!this.emailFlag && !this.phoneNumberFlag) {
      this.store.dispatch(addUser(newUser));
      form.resetForm();
      this.snackbar.openSnackBar(`New user with name: ${newUser.firstName + newUser.lastName} has been created!`)
    }
  }
}
