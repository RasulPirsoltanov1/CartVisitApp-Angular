import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/modules/card';
import { CardModuleComponent } from '../card-module/card-module.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  constructor(private dialog: MatDialog) {

  }
  ngOnInit(): void {

  }
  @Input() item!: Card; 

  openUpdateCardModal(card:Card):void {
    this.dialog.open(CardModuleComponent, {
      width: '400px',
      data: this.item
    })
  }

}
