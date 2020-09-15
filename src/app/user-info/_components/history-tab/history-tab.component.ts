import { Component, OnInit } from '@angular/core';
import {HistoryService} from './history.service';
import {History} from '../../../shared/interfaces';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss']
})
export class HistoryTabComponent implements OnInit {

  history: History[]

  constructor(public historyService: HistoryService) { }

  ngOnInit(): void {
    this.history = this.historyService.getHistory()
  }

  sort(property: string): void {
    this.historyService.sortHistoryBy(property)
    this.history = this.historyService.getHistory()
  }
}
