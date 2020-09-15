import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Hero} from '../interfaces';
import {ViewApiUrl} from './api';

@Injectable({providedIn: 'root'})
export class HeroesService {

  heroes: Hero[]
  recentSearches: Array<string> | null = null

  constructor(private http: HttpClient) {
  }

  search(searchValue: string): Observable<any>{
    return this.http.get(`${ViewApiUrl.getBaseUrl()}/search/${searchValue}`)
      .pipe(
        tap(heroes => {
          this.heroes = heroes.results
          console.log(heroes)
        })
      )
  }

  addToRecentSearch(searchValue: string): void {
    if (sessionStorage.recentSearches) {
      !this.isDuplicatedSearch(searchValue)
        && sessionStorage.setItem('recentSearches', `${sessionStorage.recentSearches + '/' + searchValue}`)
    } else {
      sessionStorage.setItem('recentSearches', `${searchValue}`)
    }
  }

  isDuplicatedSearch(searchValue: string): boolean {
    return sessionStorage.recentSearches.split('/').includes(searchValue)
  }

  getRecentSearches(): void {
    if (sessionStorage.recentSearches) {
      this.recentSearches = sessionStorage.recentSearches.split('/')
    }
  }

  addToFavorites(id: string): void {
    if (localStorage.favorites) {
      localStorage.favorites = JSON.stringify([...JSON.parse(localStorage.favorites), id])
    } else {
     localStorage.favorites = JSON.stringify([id])
    }
  }

  removeFromFavorites(id: string): void {
    localStorage.favorites = JSON.stringify(JSON.parse(localStorage.favorites).filter(favorite => id !== favorite))
  }

  getFavorites(): Array<string> | null {
    if (localStorage.favorites?.length) {
      return JSON.parse(localStorage.favorites)
    }

    return null
  }
 }
