import {Injectable} from '@angular/core';
import {History} from '../../../shared/interfaces';
import {history} from './mock-history';

@Injectable({providedIn: 'root'})
export class HistoryService {

  history: History[] = history
  toggleSort = true

  getHistory(): History[] {
    return this.history
  }

  sortHistoryBy(property: string): void {
    this.history = this.history.sort((a, b) => {
      if (a[property] < b[property]) {
        return this.toggleSort ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return this.toggleSort ? 1 : -1;
      }
      return 0;
    })

    this.toggleSort = !this.toggleSort
  }
}
