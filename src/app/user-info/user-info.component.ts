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
  }

  clickHero(): void {
    this.currentTab = 'heroes'
    this.heroesService.setFavoriteHeroes()
  }

  clickHistory(): void {
    this.currentTab = 'history'
  }

  clickPower(): void {
    this.currentTab = 'power'
  }
}
