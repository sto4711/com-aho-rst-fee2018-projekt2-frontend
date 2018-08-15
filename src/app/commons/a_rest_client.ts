import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export class A_rest_client {
  static BACKEND_WEBSHOP_URL = "http://localhost:3000/webshop/";


  constructor() {
    console.log("A_rest_client.constructor");
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
