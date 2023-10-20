import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[lettersOnly]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LettersOnlyDirective, multi: true }
  ]
})
export class LettersOnlyDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const letters = /^[A-Za-z]+$/;
    if ((value && !value.match(letters)) || value === "") {
      return { 'lettersOnly': true };
    }
    return null;
  }
}
