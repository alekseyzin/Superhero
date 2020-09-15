import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {HeroesService} from '../shared/services/heroes.service';
import {Hero} from '../shared/interfaces';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit, OnDestroy {

  hero: Hero

  private componentDestroyed$: Subject<boolean> = new Subject()

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
  }

  getHero(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.heroesService.getHeroById(params.id)
      }),
      takeUntil(this.componentDestroyed$)
    ).subscribe( hero => {
      console.log(hero);
      this.hero = hero
    })
  }

}
