import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';
import {FormValidators} from '../shared/formValidators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
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
    if (this.form.invalid) {
      console.log(this.form)
      return
    }

    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
  }
}
