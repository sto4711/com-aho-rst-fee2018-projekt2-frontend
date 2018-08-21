import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

import {Token} from 'src/app/services/login/token';
import {Product} from 'src/app/services/admin/product/product';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
  ) {
  }

  searchProducts(token: Token, term: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.clientContextService.getBackendURL_adminProducts() + '?filterName=' + term, {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap(() => console.log('get products ok'))
    );
  }


}
