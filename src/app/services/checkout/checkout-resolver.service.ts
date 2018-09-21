import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class CheckoutResolverService implements Resolve<Observable<string>> {

  constructor() {
  }

  resolve(): Observable<string> {
    console.log('CheckoutResolverService.resolve()');
    return of('');
  }

}
