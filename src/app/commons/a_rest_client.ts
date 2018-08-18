import {Observable, of} from 'rxjs';

export class A_rest_client {
  static BACKEND_URL = 'http://localhost:3000/';
  static BACKEND_WEBSHOP_URL = 'http://localhost:3000/webshop/';

  constructor() {}

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
