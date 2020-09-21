import {Component, OnDestroy} from '@angular/core';
import {HeroesService} from '../../../shared/services/heroes.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent implements OnDestroy {

  private componentDestroyed$: Subject<boolean> = new Subject()

  constructor(private heroesService: HeroesService) { }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
  }

  search(searchValue: string): void {
    this.heroesService.search(searchValue)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe()
  }
}
