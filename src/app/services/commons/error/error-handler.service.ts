import {ErrorHandler, Injectable} from '@angular/core';
import {DialogService} from "../dialog/dialog.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private dialogService: DialogService) {
    super();
  }

  public handleError(exception: any) {
    if (exception.message && exception.message.length > 0) {
      this.dialogService.confirm('Error', exception.message);
    } else {
      this.dialogService.confirm('Error', 'oops something went wrong!');
    }

    super.handleError(exception);// same behavior like standard
  }


}
