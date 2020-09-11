import { Component, OnInit } from '@angular/core';
import {ViewApiUrl} from '../../../shared/services/api';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent implements OnInit {

  modalOpen = false
  alphabetUrls: Array<string>
  currentLetter = 'A'

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getAlphabet()
  }

  getAlphabet(): void {
    const alphabetUrls = []

    for(let charCode = 97; charCode <= 122; charCode++) {
      const letter = String.fromCharCode(charCode)

      alphabetUrls.push(letter)
    }
      this.alphabetUrls = alphabetUrls
  }

  toggleModal(): void {
    this.modalOpen = !this.modalOpen
  }

  searchByLetter($event: MouseEvent): void {
    const searchLetter = (<HTMLElement> $event.target).innerText
    this.heroesService.search(searchLetter).subscribe()
    this.currentLetter = searchLetter.toLocaleUpperCase()
    this.toggleModal()
  }
}
