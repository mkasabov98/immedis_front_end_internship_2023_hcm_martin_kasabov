import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]'
})
export class PasswordValidatorDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const inputValue = this.el.nativeElement.value;

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

    if (!passwordPattern.test(inputValue)) {
      this.control.control?.setErrors({ 'passwordInvalid': true });
    } else {
      this.control.control?.setErrors(null);
    }
  }
}
