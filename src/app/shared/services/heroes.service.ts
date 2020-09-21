import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Hero} from '../interfaces';
import {ViewApiUrl} from './api';
import {logger} from 'codelyzer/util/logger';

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

  setFavoriteHeroes(): void {
    if (this.isFavorites()) {
      this.favoriteHeroes = JSON.parse(localStorage.favorites)
    }
  }

  addToRecentSearch(searchValue: string): void {
    if (!sessionStorage.recentSearches) {
      sessionStorage.setItem('recentSearches', `${searchValue}`)
    } else if (!this.isDuplicatedSearch(searchValue)) {
      sessionStorage.setItem('recentSearches', `${sessionStorage.recentSearches + '/' + searchValue}`)
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

  addToFavorites(hero: Hero): void {
    const heroData: Hero = {
      id: hero.id,
      name: hero.name,
      image: hero.image,
      powerstats: hero.powerstats
    }

    if (this.isFavorites()) {
      localStorage.favorites = JSON.stringify([...JSON.parse(localStorage.favorites), heroData])
    } else {
     localStorage.favorites = JSON.stringify([heroData])
    }
  }

  removeFromFavorites(id: string): void {
    localStorage.favorites = JSON.stringify(JSON.parse(localStorage.favorites).filter(favorite => id !== favorite.id))
  }

  getFavoritesId(): string[] | null {
    if (this.isFavorites()) {
      return JSON.parse(localStorage.favorites).map(heroes => heroes.id)
    }

    return null
  }

  getLastHeroId(): string {
    if (this.isFavorites()) {
      return JSON.parse(localStorage.favorites).pop().id
    }
  }

  private isFavorites(): boolean {
    return localStorage.favorites?.length
  }
 }
