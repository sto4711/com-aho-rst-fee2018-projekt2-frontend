import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {ConfirmYesNoService} from "../services/commons/dialog/confirm-yes-no.service";
import {SnackBarService} from "../services/commons/snack-bar/snack-bar.service";


@Injectable()
export class LoginRedirectInterceptor implements HttpInterceptor {
  private static CODE_TRANSLATION_SESSION_IS_NO_MORE_VALID_PLEASE_SIGNIN_AGAIN: string = 'SESSION-IS-NO-MORE-VALID-PLEASE-SIGNIN-AGAIN';

  constructor(private router: Router
    , private snackBarService: SnackBarService
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        //
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.snackBarService.showInfo(LoginRedirectInterceptor.CODE_TRANSLATION_SESSION_IS_NO_MORE_VALID_PLEASE_SIGNIN_AGAIN);
            this.router.navigate(['my-account']).then();
          }
        }
      })
    );
  }

}
