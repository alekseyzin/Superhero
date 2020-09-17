import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../../shared/interfaces';

@Component({
  selector: 'app-hero-block',
  templateUrl: './hero-block.component.html',
  styleUrls: ['./hero-block.component.scss']
})
export class HeroBlockComponent implements OnInit {
  @Input() hero: Hero

  constructor() { }

  ngOnInit(): void {
  }

}
