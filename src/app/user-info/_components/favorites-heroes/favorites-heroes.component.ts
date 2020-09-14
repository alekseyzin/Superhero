import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-favorites-heroes',
  templateUrl: './favorites-heroes.component.html',
  styleUrls: ['./favorites-heroes.component.scss']
})
export class FavoritesHeroesComponent implements OnInit {

  constructor(public heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.setFavoriteHeroes()
  }


}
