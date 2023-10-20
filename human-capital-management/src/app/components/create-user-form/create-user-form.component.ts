import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { countryDetailsInterface } from 'src/app/interfaces/countryDetails.interface';
import { Observable, Subject, takeUntil } from "rxjs"
import { StoreInterface } from 'src/app/store/store.interface';
import { selectCountryDetails } from 'src/app/store/countryDetailsReducer/country-details.selectors';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  countryDetails$: Observable<countryDetailsInterface> = new Observable();
  sexOption = "male";
  countriesOptions!: string[];

  private destroy$ = new Subject<void>();

  constructor(private store: Store<StoreInterface>) { }

  ngOnInit() {
    this.countryDetails$ = this.store.select(selectCountryDetails);
    this.countryDetails$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.countriesOptions = data.countries;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
