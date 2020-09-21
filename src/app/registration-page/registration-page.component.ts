import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserCreate} from '../shared/interfaces';
import {FormValidators} from '../shared/formValidators';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initializationForm()
  }

  initializationForm(): void {
    this.form = new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          FormValidators.checkMissingLetters,
          FormValidators.checkNameCase
        ]),
        email: new FormControl(null, [
          Validators.required,
          FormValidators.checkEmailDomain,
          FormValidators.checkDotsLimit,
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          FormValidators.checkPasswordFormat,
          FormValidators.checkPasswordUniq
        ]),
      }
    );
  }

  submit(): void {
    if (!this.form.invalid) {
      const user: UserCreate = {...this.form.value}

      this.authService.registration(user)
    }
  }

  isInvalidInput(inputName: string): boolean {
    return this.form.get(inputName).touched && this.form.get(inputName).invalid
  }

  isInputEmpty(inputName: string): boolean {
    return this.form.get(inputName).errors.required
  }

  isShortLengthInput(inputName: string): boolean {
    return this.form.get(inputName).errors.minlength
  }

  isMissingLetters(inputName: string): boolean {
    return this.form.get(inputName).errors.isMissingLetters
  }

  isInvalidNameCase(inputName: string): boolean {
    return this.form.get(inputName).errors.isInvalidNameCase
  }

  isInvalidDotsLimit(inputName: string): boolean {
    return this.form.get(inputName).errors.isInvalidDotsLimit
  }

  isInvalidEmailDomain(inputName: string): boolean {
    return this.form.get(inputName).errors.isInvalidEmailDomain
  }

  isInvalidPasswordFormat(inputName: string): boolean {
    return this.form.get(inputName).errors.isInvalidPasswordFormat
  }

  isIncludesEmail(inputName: string): boolean {
    return this.form.get(inputName).errors.isIncludesEmail
  }

  isIncludesName(inputName: string): boolean {
    return this.form.get(inputName).errors.isIncludesName
  }
}
