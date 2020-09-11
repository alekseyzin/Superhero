import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../../shared/interfaces';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit {
  @Input() hero: Hero

  isFavorite = false

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    if (this.isFavorites()) {
      this.isFavorite = true
    }
  }

  doFavorite(): void {
    this.isFavorite = true
    this.heroesService.addToFavorites(this.hero.id)
  }

  doUsual(): void {
    this.isFavorite = false
    this.heroesService.removeFromFavorites(this.hero.id)
  }

  isFavorites(): boolean {
    return this.heroesService.getFavorites() && this.heroesService.getFavorites().includes(this.hero.id)
  }
}
