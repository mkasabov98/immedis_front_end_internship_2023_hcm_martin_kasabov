import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[yearValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: YearValidatorDirective, multi: true}]
})
export class YearValidatorDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    const dateValue: Date = new Date(control.value);
    if (dateValue && dateValue.getFullYear() > 2004) {
      return {'yearExceeded': true};
    }
    return null;
  }
}
