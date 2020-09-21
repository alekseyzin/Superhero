import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss']
})
export class ResultModalComponent implements OnInit {
  @Input() message: string
  @Input() loader: boolean
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter<boolean>()


  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.onCloseModal.emit(false)
  }
}
