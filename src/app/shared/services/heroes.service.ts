import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Hero} from '../interfaces';
import {ViewApiUrl} from './api';

@Injectable({providedIn: 'root'})
export class HeroesService implements OnDestroy{

  heroes: Hero[]
  recentSearches: string[] | null = null
  favoriteHeroes: Hero[] = []
  private componentDestroyed$: Subject<boolean> = new Subject()

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
  }

  search(searchValue: string): Observable<any>{
    return this.http.get(`${ViewApiUrl.getBaseUrl()}/search/${searchValue}`)
      .pipe(
        tap(heroes => {
          this.heroes = heroes.results
        })
      )
  }

  getFavoriteHero(id: string): Observable<any> {
    return this.http.get(`${ViewApiUrl.getBaseUrl()}/${id}`)
      .pipe(
        tap(
          hero => {
            this.favoriteHeroes.push(hero)
          }
        )
      )
  }

  getAllFavoriteHeroes(): void {
    const idHeroes = this.getFavorites()

    this.favoriteHeroes = []

    if (idHeroes) {
      idHeroes.forEach( id => this.getFavoriteHero(id)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe()
      )
    }

  }

  addToRecentSearch(searchValue: string): void {
    if (sessionStorage.recentSearches) {
      if (!this.isDuplicatedSearch(searchValue)) {
        sessionStorage.setItem('recentSearches', `${sessionStorage.recentSearches + '/' + searchValue}`)
      }
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

  getFavorites(): string[] | null {
    if (localStorage.favorites?.length) {
      return JSON.parse(localStorage.favorites)
    }

    return null
  }
 }
