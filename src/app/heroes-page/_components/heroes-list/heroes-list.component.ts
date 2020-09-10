import { Component} from '@angular/core';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent {

  constructor(public heroesService: HeroesService) {}
}
