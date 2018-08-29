import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from "rxjs";
import {DialogConfirmComponent} from "../../../components/commons/dialog/dialog-confirm/dialog-confirm.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<DialogConfirmComponent>;

    dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
