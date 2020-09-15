import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../../shared/interfaces';
import {HeroesService} from '../../../shared/services/heroes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit {
  @Input() hero: Hero;

  isFavorite = false;
  isLastHero = false;

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.checkFavorite()) {
      this.isFavorite = true;
    }
    if (this.router.url === '/user-info') {
      this.isLastHero = (this.hero.id === this.heroesService.getLastHeroId());
    }
  }

  doFavorite(): void {
    this.isFavorite = true;
    this.heroesService.addToFavorites(this.hero);
  }

  doUsual(): void {
    this.isFavorite = false;
    this.heroesService.removeFromFavorites(this.hero.id);
    this.heroesService.setFavoriteHeroes()
  }

  checkFavorite(): boolean {
    return this.heroesService.getFavoritesId() && this.heroesService.getFavoritesId().includes(this.hero.id);
  }
}
