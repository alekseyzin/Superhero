import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {AuthService} from '../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false
  message: string

  private componentDestroyed$: Subject<boolean> = new Subject()

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.listenOnQueryParamsUpdated()
    this.initializationForm()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
  }

  listenOnQueryParamsUpdated(): void {
    const message = 'Your current session has expired. Please login again to continue using this app!'

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = message
      }
    })
  }

  initializationForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  sabmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true

    const user: User = {...this.form.value};

    this.handlerAuth(user)
  }

  handlerAuth(user: User): void {
    this.authService.login(user)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((val) => {
        this.form.reset();
        this.router.navigate(['/heroes'])
        this.submitted = false
      });
  }

  goRegistrationPage(): void {
    this.router.navigate(['/reg']);
  }

  isInvalidInput(inputName: string): boolean {
    return this.form.get(inputName).touched && this.form.get(inputName).invalid
  }

  isInputEmpty(inputName: string): boolean {
    return this.form.get(inputName).errors.required
  }
}
