import {Injectable} from '@angular/core';
import {PowerupItem} from '../interfaces';
import {powerupItems} from '../powerup-items';

@Injectable({providedIn: 'root'})
export class PowerupService {

  powerupItems: PowerupItem[] = powerupItems

  constructor() {
  }

  getSortPowerups(): PowerupItem[] {
    const activePowerups = this.powerupItems.filter(powerup => powerup.count > 0)
    const westedPowerups = this.powerupItems.filter(powerup => powerup.count === 0)

    return activePowerups.concat(westedPowerups)
  }

  getAvailablePowerups(): PowerupItem[] {
    return this.powerupItems.filter(powerup => powerup.count > 0)
  }

  changePowerupsCount(): void {
    this.powerupItems = this.powerupItems.map((powerup: PowerupItem) => {
      if (powerup.checked && (powerup.count > 0)) {
        return {...powerup, count: powerup.count - 1}
      }
      return powerup
    })
  }

}
