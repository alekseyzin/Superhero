import {Component, Input, OnInit} from '@angular/core';
import {PowerupItem} from '../../../shared/interfaces';

@Component({
  selector: 'app-battle-powerup',
  templateUrl: './battle-powerup.component.html',
  styleUrls: ['./battle-powerup.component.scss']
})
export class BattlePowerupComponent implements OnInit {
  @Input() powerup: PowerupItem

  constructor() { }

  ngOnInit(): void {
  }

}
