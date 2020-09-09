import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {AuthService} from '../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false
  message: string

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Your current session has expired. Please login again to continue using this app!'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  goToPostsPage(): void {
    this.router.navigate(['/reg']);
  }

  sabmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe((val) => {
      this.form.reset();
      this.router.navigate(['/'])
    });

    this.submitted = false
  }
}
