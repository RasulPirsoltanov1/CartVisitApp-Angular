import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }
  createSnackBar(type:string,message: string,_duration:number=4000) {
    this._snackBar.open(message || "xeta yarandi", '', {
      duration: _duration,
      panelClass:type
    });
  }
}
