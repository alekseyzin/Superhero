import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { HeroesPageComponent } from './heroes-page/heroes-page.component';
import { SearchBlockComponent } from './heroes-page/_components/search-block/search-block.component';
import { HeroesListComponent } from './heroes-page/_components/heroes-list/heroes-list.component';
import { HeroItemComponent } from './heroes-page/_components/hero-item/hero-item.component';
import { RecentSearchComponent } from './heroes-page/_components/recent-search/recent-search.component';
import { SearchComponent } from './heroes-page/_components/search/search.component';
import { AlphabetComponent } from './heroes-page/_components/alphabet/alphabet.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HistoryTabComponent } from './user-info/_components/history-tab/history-tab.component';
import { PowerTabComponent } from './user-info/_components/power-tab/power-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HeroesPageComponent,
    SearchBlockComponent,
    HeroesListComponent,
    HeroItemComponent,
    RecentSearchComponent,
    SearchComponent,
    AlphabetComponent,
    UserInfoComponent,
    HistoryTabComponent,
    PowerTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
