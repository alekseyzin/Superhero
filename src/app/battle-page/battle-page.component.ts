import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroesService} from '../shared/services/heroes.service';
import {BattleResult, Hero, History, PowerupItem} from '../shared/interfaces';
import {Observable, of, Subject} from 'rxjs';
import {delay, takeUntil, tap} from 'rxjs/operators';
import {PowerupService} from '../shared/services/powerup.service';
import {HistoryService} from '../shared/services/history.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit, OnDestroy {

  myHero: Hero;
  opponentHero: Hero;
  powerups: PowerupItem[];
  isModalOpen = false;
  message: string;
  loader: boolean;

  private componentDstroyed$: Subject<boolean> = new Subject();
  private fightDelay: Subject<any> = new Subject<any>()

  constructor(
    private heroesService: HeroesService,
    private powerupService: PowerupService,
    private historyService: HistoryService,
  ) {
  }

  ngOnInit(): void {
    this.setMyHeroData()
    this.setOpponentHero();
    this.fightHandler().subscribe()
  }

  ngOnDestroy(): void {
    this.componentDstroyed$.next(true);
  }

  fightHandler(): any {
    return this.fightDelay.pipe(
      delay(2000),
      tap(() => {
        const result = this.getBattleResult();
        const historyData = this.getHistoryData(result);

        this.powerupService.changePowerupsCount();
        this.powerups = this.powerupService.getAvailablePowerups();
        this.historyService.logHistory(historyData);
        this.message = `You ${result}`;
        this.loader = false;
        }
      ),
      takeUntil(this.componentDstroyed$)
    )
  }

  startFight(): void {
    this.setStartFightOptions()
    this.fightDelay.next()
  }

  setStartFightOptions(): void {
    this.message = 'Waiting...';
    this.isModalOpen = true;
    this.loader = true;
  }

  setOpponentHero(): void {
    this.heroesService.getRandomHero()
      .pipe(
        takeUntil(this.componentDstroyed$)
      )
      .subscribe((hero: Hero) => {
        this.opponentHero = hero;
      });
  }

  setMyHeroData(): void {
    this.myHero = this.heroesService.getLastHero();
    this.powerups = this.powerupService.getAvailablePowerups();
  }

  selectPowerup(id: number): void {
    const currentPowerup = this.powerupService.powerupItems.find(powerup => powerup.id === id);

    currentPowerup.checked = !currentPowerup.checked;
    this.powerups = this.powerupService.getAvailablePowerups();
  }

  getHeroPower(hero: Hero): number {
    return Object.entries(hero.powerstats)
      .reduce((accum: number, power: string[]) => accum + Number(power[1]), 0);
  }

  getPowerupsPower(): number {
    return this.powerups.reduce((accum: number, powerup: PowerupItem) => {
      if (powerup.checked && powerup.count > 0) {
        return accum + powerup.power;
      }
      return accum + 0;
    }, 0);
  }

  getBattleResult(): BattleResult {
    const myHeroPower = this.getHeroPower(this.myHero);
    const opponentHeroPower = this.getHeroPower(this.opponentHero);
    const powerupsPower = this.getPowerupsPower();
    const result = myHeroPower + powerupsPower - opponentHeroPower;

    if (result > 0) {
      return 'won';
    } else if (result < 0) {
      return 'lost';
    } else {
      return 'draw';
    }
  }

  getHistoryData(result: BattleResult): History {
    return {
      date: new Date(),
      hero: this.myHero.name,
      heroId: this.myHero.id,
      opponent: this.opponentHero.name,
      opponentId: this.opponentHero.id,
      result: result
    };
  }

  closeModal($event: boolean): void {
    this.isModalOpen = $event;
  }
}
