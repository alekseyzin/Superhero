import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-posts-page',
  templateUrl: './heroes-page.component.html',
  styleUrls: ['./heroes-page.component.scss']
})
export class HeroesPageComponent implements OnInit, OnDestroy {

  notAccessToBattle = false;

  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listenOnQueryParamsUpdated()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
  }

  listenOnQueryParamsUpdated(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((params: Params) => {
        this.notAccessToBattle = params['notAccessToBattle'] ? true : false
      });
  }

}
