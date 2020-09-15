import {Injectable} from '@angular/core';
import {PowerupItem} from '../interfaces';
import {powerupItems} from '../powerup-items';

@Injectable({providedIn: 'root'})
export class PowerupService {

  powerupItems: PowerupItem[] = powerupItems

  constructor() {
  }

  getSortPowerupItems(): PowerupItem[] {
    const activePowerups = this.powerupItems.filter(powerup => powerup.count > 0)
    const westedPowerups = this.powerupItems.filter(powerup => powerup.count === 0)

    return activePowerups.concat(westedPowerups)
  }

}
