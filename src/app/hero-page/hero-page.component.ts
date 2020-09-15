import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HeroesService} from '../shared/services/heroes.service';
import {Hero} from '../shared/interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit {

  hero: Hero

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.heroesService.getHeroById(params.id)
      })
    ).subscribe( hero => {
      this.hero = hero
      console.log(hero);
    })
  }

}
