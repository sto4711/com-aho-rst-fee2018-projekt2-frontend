import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from "rxjs";
import {DialogConfirmDeleteComponent} from '../../../components/commons/dialog/dialog-confirm-delete/dialog-confirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteService {

  constructor(private dialog: MatDialog) { }

  public confirm(name: string ): Observable<string> {

    let dialogRef: MatDialogRef<DialogConfirmDeleteComponent>;

    dialogRef = this.dialog.open(DialogConfirmDeleteComponent);
    dialogRef.componentInstance.artName = name;

    return dialogRef.afterClosed();
  }
}
