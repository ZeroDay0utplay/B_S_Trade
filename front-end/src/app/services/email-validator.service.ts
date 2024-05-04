import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  constructor() { }


  emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { 'invalidEmail': { value: control.value } };
    };
}

}
