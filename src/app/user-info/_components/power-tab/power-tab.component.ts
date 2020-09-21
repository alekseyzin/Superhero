import { Component, OnInit } from '@angular/core';

import {PowerupService} from '../../../shared/services/powerup.service';
import {PowerupItem} from '../../../shared/interfaces';

@Component({
  selector: 'app-power-tab',
  templateUrl: './power-tab.component.html',
  styleUrls: ['./power-tab.component.scss']
})
export class PowerTabComponent implements OnInit {

  powerupItems: PowerupItem[]

  constructor(public powerup: PowerupService) { }

  ngOnInit(): void {
    this.powerupItems = this.powerup.getSortPowerups()
  }

}
