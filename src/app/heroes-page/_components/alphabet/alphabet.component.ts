import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HeroesService} from '../../../shared/services/heroes.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent implements OnInit {
  @Output() onAlphabetSearch: EventEmitter<string> = new EventEmitter<string>()

  modalOpen = false
  alphabetUrls: string[]
  currentLetter = 'A'

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.setAlphabet()
  }

  setAlphabet(): void {
    const alphabetUrls = []
    const charCodeA = 97;
    const charCodeZ = 122;

    for(let charCode = charCodeA; charCode <= charCodeZ; charCode++) {
      const letter = String.fromCharCode(charCode)

      alphabetUrls.push(letter)
    }
      this.alphabetUrls = alphabetUrls
  }

  toggleModal(): void {
    this.modalOpen = !this.modalOpen
  }

  searchByLetter(searchLetter: string): void {
    this.onAlphabetSearch.emit(searchLetter)
    this.currentLetter = searchLetter.toLocaleUpperCase()
    this.toggleModal()
  }
}
