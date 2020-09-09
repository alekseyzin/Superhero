import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidators} from '../../../shared/formValidators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initializationForm()
  }

  initializationForm(): void {
    this.form = new FormGroup({
      search: new FormControl(null, [
        Validators.required,
        FormValidators.checkSearchInput,
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const search: string = this.form.value.search
  }

  isInvalidInput(inputName: string): boolean {
    return this.form.get(inputName).touched && this.form.get(inputName).invalid
  }
}
