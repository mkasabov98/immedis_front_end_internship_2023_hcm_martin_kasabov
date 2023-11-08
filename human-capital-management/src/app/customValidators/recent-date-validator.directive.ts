import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[recentDateValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RecentDateValidatorDirective, multi: true }]
  })
  export class RecentDateValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
      if (!control.value) {
        return null;
      }
      
      const inputDate = new Date(control.value);
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      const oneMonthAhead = new Date();
      oneMonthAhead.setMonth(currentDate.getMonth() + 1);
  
      if (inputDate < oneMonthAgo) {
        return { dateTooOld: true };
      }
  
      if (inputDate > oneMonthAhead) {
        return { dateTooBig: true };
      }
  
      return null;
    }
  }
  