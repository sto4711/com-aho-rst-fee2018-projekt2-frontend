import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.scss']
})
export class DialogConfirmDeleteComponent implements OnInit {
  public artName: string;

  constructor(public dialogRef: MatDialogRef<DialogConfirmDeleteComponent>) { }

  ngOnInit() {
  }

}
