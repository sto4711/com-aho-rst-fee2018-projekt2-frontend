import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar
  , private translateService: TranslateService) { }

  private show(messageToTranslate: string, panelClass: string)  {
    this.translateService.get(messageToTranslate).subscribe(translated => {
        this.snackBar.open(translated, null, {duration: 2500, panelClass: panelClass});
      }
    );
  }

  public showInfo(messageToTranslate: string)  {
    this.show(messageToTranslate, 'snackbar-info');
  }

  public showWarning(messageToTranslate: string)  {
    this.show(messageToTranslate, 'snackbar-warning');
  }

  public showError(messageToTranslate: string)  {
    this.show(messageToTranslate, 'snackbar-error');
  }

}
