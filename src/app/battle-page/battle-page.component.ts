import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroesService} from '../shared/services/heroes.service';
import {Hero, History, PowerupItem} from '../shared/interfaces';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PowerupService} from '../shared/services/powerup.service';
import {HistoryService} from '../shared/services/history.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit, OnDestroy {

  myHero: Hero
  opponentHero: Hero
  powerups: PowerupItem[]
  isModalOpen = false
  message: string
  loader: boolean

  private componentDstroyed$: Subject<boolean> = new Subject()

  constructor(
    private heroesService: HeroesService,
    private powerupService: PowerupService,
    private historyService: HistoryService,
  ) { }

  ngOnInit(): void {
    this.myHero = this.heroesService.getLastHero()
    this.powerups = this.powerupService.getAvailablePowerups()
    this.heroesService.getRandomHero()
      .pipe(
        takeUntil(this.componentDstroyed$)
      )
      .subscribe((hero: Hero) => {
        this.opponentHero = hero
      })
  }

  ngOnDestroy(): void {
    this.componentDstroyed$.next(true)
  }

  startFight(): void {
    this.message = 'Waiting...'
    this.isModalOpen = true
    this.loader = true

    new Observable( observer => {
      setTimeout(() => {
        const result = this.getBattleResult()
        const historyData = this.getHistoryData(result)

        this.powerupService.changePowerupsCount()
        this.powerups = this.powerupService.getAvailablePowerups()
        this.historyService.logHistory(historyData)
        this.message = `You ${result}`
        this.loader = false
      }, 2000)
    }).subscribe()
  }

  togglePowerup(id: number): void {
    const idx = this.powerupService.powerupItems.findIndex(powerup => powerup.id === id)

    this.powerupService.powerupItems[idx].checked = !this.powerups[idx].checked
    this.powerups = this.powerupService.getAvailablePowerups()
  }

  getHeroPower(hero: Hero): number {
    return Object.entries(hero.powerstats)
      .reduce((accum: number, power: string[]) => accum + Number(power[1]), 0 )
  }

  getPowerupsPower(): number {
    return this.powerups.reduce((accum: number, powerup: PowerupItem) => {
      if (powerup.checked && powerup.count > 0) {
        return accum + powerup.power
      }
      return accum + 0
    }, 0)
  }

  getBattleResult(): 'won' | 'lost' | 'draw' {
    const myHeroPower = this.getHeroPower(this.myHero)
    const opponentHeroPower = this.getHeroPower(this.opponentHero)
    const powerupsPower = this.getPowerupsPower()
    const result =  myHeroPower + powerupsPower - opponentHeroPower

    if (result > 0) {
      return 'won'
    } else if (result < 0) {
      return 'lost'
    } else {
      return 'draw'
    }
  }

  getHistoryData(result: 'won' | 'lost' | 'draw'): History {
    return {
      date: new Date(),
      hero: this.myHero.name,
      heroId: this.myHero.id,
      opponent: this.opponentHero.name,
      opponentId: this.opponentHero.id,
      result: result
    }
  }

  closeModal($event: boolean): void {
    this.isModalOpen = $event
  }
}
