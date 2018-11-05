import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm-yes-no',
  templateUrl: './dialog-confirm-yes-no.component.html',
  styleUrls: ['./dialog-confirm-yes-no.component.scss']
})
export class DialogConfirmYesNoComponent {
  public title: string;

  constructor(public dialogRef: MatDialogRef<DialogConfirmYesNoComponent>) { }


}
