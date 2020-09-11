import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../shared/services/heroes.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  currentTab: 'heroes' | 'history' | 'power' = 'heroes'

  constructor(public heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getAllFavoriteHeroes()
  }

  clickHero() {
    this.currentTab = 'heroes'
    this.heroesService.getAllFavoriteHeroes()
  }

  clickHistory() {
    this.currentTab = 'history'
  }

  clickPower() {
    this.currentTab = 'power'
  }
}
