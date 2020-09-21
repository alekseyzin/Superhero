import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {HeroesPageComponent} from './heroes-page/heroes-page.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {HeroPageComponent} from './hero-page/hero-page.component';
import {BattlePageComponent} from './battle-page/battle-page.component';
import {BattleGuard} from './shared/guards/battle.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'heroes', component: HeroesPageComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginPageComponent},
      {path: 'reg', component: RegistrationPageComponent},
      {path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard]},
      {path: 'hero/:id', component: HeroPageComponent, canActivate: [AuthGuard]},
      {path: 'battle', component: BattlePageComponent, canActivate: [AuthGuard, BattleGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
