import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { Observable, Subject, takeUntil } from "rxjs"
import { Store } from '@ngrx/store';
import { selectAllCountries, selectAllCurrencies, selectAllNationalities } from 'src/app/store/countryDetailsReducer/country-details.selectors';
import { selectAllDepartments, selectAllPositions } from 'src/app/store/workforceDetailsReducer/workforceDetails.selectors';
import { NgForm } from '@angular/forms';
import { addCountry, addCurrency, addNationality } from 'src/app/store/countryDetailsReducer/country-details.actions';
import { addDepartment, addPosition } from 'src/app/store/workforceDetailsReducer/workforceDetails.actions';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';

@Component({
  selector: 'app-add-company-details-form',
  templateUrl: './add-company-details-form.component.html',
  styleUrls: ['./add-company-details-form.component.scss']
})
export class AddCompanyDetailsFormComponent implements OnInit, OnDestroy {


  allCountries$: Observable<string[]> = new Observable();
  allNationalities$: Observable<string[]> = new Observable();
  allCurrencies$: Observable<string[]> = new Observable();
  allDepartments$: Observable<string[]> = new Observable();
  allPositions$: Observable<string[]> = new Observable();

  allCountries: string[] = [];
  allNationalities: string[] = [];
  allCurrencies: string[] = [];
  allDepartments: string[] = [];
  allPositions: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<StoreInterface>,
    private snackBar: CustomMaterialSnackbarComponent
    ) { }

  ngOnInit(): void {
    this.allCountries$ = this.store.select(selectAllCountries);
    this.allCountries$.pipe(takeUntil(this.destroy$)).subscribe(data => {
    });

    this.allNationalities$ = this.store.select(selectAllNationalities);
    this.allNationalities$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allNationalities = data;
    });

    this.allCurrencies$ = this.store.select(selectAllCurrencies);
    this.allCurrencies$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allCurrencies = data;
    });

    this.allDepartments$ = this.store.select(selectAllDepartments);
    this.allDepartments$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allDepartments = data;
    });

    this.allPositions$ = this.store.select(selectAllPositions);
    this.allPositions$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.allPositions = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddCountryFormSubmit(form: NgForm) {
    const countryInput = form.value.country;
    const existingCountry = this.allCountries.findIndex(country => country.toLowerCase() === countryInput.toLowerCase());

    if (existingCountry >= 0) {
      form.controls['country'].setErrors({ 'duplicate': true })
    } else {
      this.store.dispatch(addCountry({ newCountry: countryInput }));
      form.resetForm();
      this.snackBar.openSnackBar(`${countryInput} has been added to the countries, now you can use ${countryInput} in the form for creating a new user`);
    }
  }

  onAddNationalityFormSubmit(form: NgForm) {
    const nationalityInput = form.value.nationality;
    const existingNationality = this.allNationalities.findIndex(nationality => nationality.toLowerCase() === nationalityInput.toLowerCase());

    if (existingNationality >= 0) {
      form.controls['nationality'].setErrors({ 'duplicate': true })
    } else {
      this.store.dispatch(addNationality({ newNationality: nationalityInput }));
      form.resetForm();
      this.snackBar.openSnackBar(`${nationalityInput} has been added to the nationalities, now you can use ${nationalityInput} in the form for creating a new user`);
    }
  }

  onAddCurrencyFormSubmit(form: NgForm) {
    const currencyInput = form.value.currency;
    const existingCurrency = this.allCurrencies.findIndex(currency => currency.toLowerCase() === currencyInput.toLowerCase());

    if (existingCurrency >= 0) {
      form.controls['currency'].setErrors({ 'duplicate': true });
    } else {
      this.store.dispatch(addCurrency({ newCurrency: currencyInput }));
      form.resetForm();
      this.snackBar.openSnackBar(`${currencyInput} has been added to the nationalities, now you can use ${currencyInput} in the form for creating a new user`);
    }
  }

  onAddDepartmentFormSubmit(form: NgForm) {
    const departmentInput = form.value.department;
    const existingDepartment = this.allDepartments.findIndex(department => department.toLowerCase() === departmentInput.toLowerCase());

    if (existingDepartment >= 0) {
      form.controls['department'].setErrors({ 'duplicate': true });
    } else {
      this.store.dispatch(addDepartment({ newDepartment: departmentInput }));
      form.resetForm();
      this.snackBar.openSnackBar(`${departmentInput} has been added to the nationalities, now you can use ${departmentInput} in the form for creating a new user`);
    }
  }
  onAddPositionFormSubmit(form: NgForm) {
    const positionInput = form.value.position
    const existingPosition = this.allPositions.findIndex(position => position.toLowerCase() === positionInput.toLowerCase());

    if (existingPosition >= 0) {
      form.controls['position'].setErrors({ 'duplicate': true });
    } else {
      this.store.dispatch(addPosition({ newPosition: positionInput }));
      form.resetForm();
      this.snackBar.openSnackBar(`${positionInput} has been added to the nationalities, now you can use ${positionInput} in the form for creating a new user`);
    }
  }
}
