import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModuleComponent } from './card-module/card-module.component';
import { CardService } from '../services/card.service';
import { Card } from '../modules/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(public dialog: MatDialog, public cardService: CardService) {

  }
  openDialog(): void {
    const dialog = this.dialog.open(CardModuleComponent, {
      width: '400px'
    })
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.cardService.getCards();
      }
    })
  }
  ngOnInit(): void {
    this.cardService.getCards();
  }
  
}
