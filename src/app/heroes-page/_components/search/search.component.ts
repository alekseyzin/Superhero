import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidators} from '../../../shared/formValidators';
import {HeroesService} from '../../../shared/services/heroes.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private componentDestroyed$: Subject<boolean> = new Subject()
  isFetching = false

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit(): void {
    this.initializationForm();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
  }

  initializationForm(): void {
    this.form = new FormGroup({
      search: new FormControl(null, [
        Validators.required,
        FormValidators.checkSearchInput,
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isFetching = true

    const search: string = this.form.value.search;

    this.heroesService.search(search)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe( response => {
        (response.response === 'success') && this.heroesService.addToRecentSearch(search)
        this.heroesService.getRecentSearches()
        this.isFetching = false
      });
  }

  isInvalidInput(inputName: string): boolean {
    return this.form.get(inputName).touched && this.form.get(inputName).invalid;
  }
}
