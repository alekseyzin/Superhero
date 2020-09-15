import {Component, Input, OnInit} from '@angular/core';
import {PowerupItem} from '../../../shared/interfaces';

@Component({
  selector: 'app-powerup-item',
  templateUrl: './powerup-item.component.html',
  styleUrls: ['./powerup-item.component.scss']
})
export class PowerupItemComponent implements OnInit {
  @Input() powerup: PowerupItem

  constructor() { }

  ngOnInit(): void {
  }

}
