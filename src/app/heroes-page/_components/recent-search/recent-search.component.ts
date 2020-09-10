import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {

  constructor(public heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getRecentSearches()
  }

  search(searchElem: MouseEvent): void {
    const searchVal = (<HTMLElement> searchElem.target).innerText
    this.heroesService.search(searchVal).subscribe()
  }
}
