import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserComponent} from './components/admin/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {LoginService} from './services/login/login.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {SearchComponent} from './components/search/search.component';
import {TrimPipe} from './pipes/trim.pipe';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {ArticleComponent} from './components/admin/article/article.component';
import {AmountConverterPipe} from './pipes/currency.pipe';
import {ArticleTemplateComponent} from './components/article-template/article-template.component';
import {MatComponentsModule} from './mat-components/mat-components.module';
import {MatCardModule} from '@angular/material/card';
import {HeaderComponent} from './components/header/header.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {DeTrimPipe} from './pipes/de-trim.pipe';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LangSwitchComponent} from './components/lang-switch/lang-switch.component';
import {ShoppingBasketListingComponent} from './components/shopping-basket-listing/shopping-basket-listing.component';
import {LangService} from './services/lang-service/lang.service';
import {OverviewComponent} from './components/admin/overview/overview.component';
import {RequestCacheService} from "./services/request-cache/request-cache.service";
import {CacheInterceptor} from "./interceptors/cache-interceptor";
import {SnackBarService} from "./services/commons/snack-bar/snack-bar.service";
import {DialogConfirmYesNoComponent} from "./components/commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component";
import {CanComponentDeactivateGuard} from "./services/commons/can-component-deactivate-guard/can-component-deactivate-guard";
import {ErrorResponseInterceptor} from "./interceptors/error-response-interceptor";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ArticleListingComponent,
    MyAccountComponent,
    ArticleDetailComponent,
    ShoppingBasketComponent,
    ArticleComponent,
    ArticleTemplateComponent,
    HeaderComponent,
    TopBarComponent,
    FooterComponent,
    DialogConfirmYesNoComponent,
    OrderDetailComponent,
    CheckoutComponent,
    BreadcrumbComponent,
    SearchComponent,
    TrimPipe,
    DeTrimPipe,
    AmountConverterPipe,
    NotFoundComponent,
    LangSwitchComponent,
    ShoppingBasketListingComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    DialogConfirmYesNoComponent],
  providers: [LoginService, LangService, CanComponentDeactivateGuard,SnackBarService,
    RequestCacheService,
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
