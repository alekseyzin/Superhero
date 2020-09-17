import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.router.navigate(['heroes'])
  }
}
