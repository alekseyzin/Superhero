import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {
  @Output() onRecentSearch: EventEmitter<string> = new EventEmitter<string>()

  constructor(public heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getRecentSearches()
  }

  search(searchElem): void {
    this.onRecentSearch.emit(searchElem)
  }
}
