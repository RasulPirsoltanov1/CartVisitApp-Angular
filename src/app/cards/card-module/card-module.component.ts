import { DialogRef } from '@angular/cdk/dialog';
// import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/modules/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-module',
  templateUrl: './card-module.component.html',
  styleUrls: ['./card-module.component.scss']
})
export class CardModuleComponent implements OnInit {
  cardForm!: FormGroup;
  durationInSeconds = 5;
  showSpinner: boolean = false;

  constructor(private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CardModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private snackbarService: SnackbarService
  ) {
  }
  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
  }
  addCard() {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe({
      next: (res: any) => {
        this.getSuccess(res);
      },
      error: (err: any) => {
        this.getError(err.message)
      }
    });
  }
  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id).subscribe({
      next: (res: any) => {
        this.getSuccess(res);
      },
      error: (err: any) => {
        this.getError(err.message)
      }
    });
  }
  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id).subscribe({
      next: (res: any) => {
        this.getSuccess(res);
      },
      error: (err: any) => {
        this.getError(err.message)
      }
    });
  }
  getSuccess(message: string) {
    this.snackbarService.createSnackBar("success",message);
    this.cardService.getCards()
    this.showSpinner = false;
    this.dialogRef.close()
  }
  getError(message: string) {
    this.snackbarService.createSnackBar("error",message);
    this.cardService.getCards();
    this.showSpinner = false;
  }
}


