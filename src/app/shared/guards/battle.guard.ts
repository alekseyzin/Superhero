import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HeroesService} from '../services/heroes.service';

@Injectable({providedIn: 'root'})
export class BattleGuard implements CanActivate{

  constructor(
    private heroesService: HeroesService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.heroesService.setFavoriteHeroes()

    if (this.heroesService.favoriteHeroes.length > 1) {
      return true
    } else {
      this.router.navigate(['heroes'], {
        queryParams: {
          notAccessToBattle: true
        }
      })
    }
  }
}
