import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, EMPTY, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, startWith} from 'rxjs/operators';
import {HttpErrorResponse} from "@angular/common/http";

import {InfoService} from 'src/app/services/info/info.service';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ProductService} from 'src/app/services/admin/product/product.service';
import {Product} from 'src/app/services/admin/product/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title: string = 'Bikes';
  products$: Observable<Product[]>;
  imageURL: string =  this.clientContextService.getBackendURL_public();
  private searchTerms = new Subject<string>();

  constructor(
    private infoService: InfoService
    , private loginService: LoginService
    , private clientContextService: ClientContextService
    , private productService: ProductService
    , private router: Router
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.productService.searchProducts(this.clientContextService.getToken(), term)),
      catchError((error: HttpErrorResponse, caught: Observable<Product>) => {
        return of(this.handleError('search bikes', error));
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  private handleError<T>(operation = 'operation', error: any) {
    if (error instanceof HttpErrorResponse && error.status == 401) {
      this.infoService.showError(operation + ' not authenticated, please login');
      this.router.navigate(['login']).then();
    }else {
      alert(error.message);
    }

    return EMPTY;
  }


}
