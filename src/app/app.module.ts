import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {SearchComponent} from './components/search/search.component';
import {TrimPipe} from './pipes/trim.pipe';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {AmountConverterPipe} from './pipes/currency.pipe';
import {ArticleTemplateComponent} from './components/article-template/article-template.component';
import {MatComponentsModule} from './mat-components/mat-components.module';
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
import {SnackBarService} from "./services/commons/snack-bar/snack-bar.service";
import {DialogConfirmYesNoComponent} from "./components/commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component";
import {CanComponentDeactivateGuard} from "./services/commons/can-component-deactivate-guard/can-component-deactivate-guard";
import {ErrorResponseInterceptor} from "./interceptors/error-response-interceptor";
import { LoginInfoComponent } from './components/login-info/login-info.component';
import {UserService} from "./services/user/user.service";
import {ArticlesResponseCacheInterceptor} from "./interceptors/articles-response-cache-interceptor";
import {ArticlesResponseCacheService} from "./services/articles-response-cache/articles-response-cache.service";
import {SlideshowModule} from 'ng-simple-slideshow';
import {InitAppResolverService} from "./resolver/init-app-resolver-service";
import {AuthAdminGuardService} from "./services/auth-admin-guard/auth-admin-guard.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleListingComponent,
    MyAccountComponent,
    ArticleDetailComponent,
    ShoppingBasketComponent,
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
    LoginInfoComponent,
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
    SlideshowModule,
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
  providers: [InitAppResolverService, UserService, LangService, CanComponentDeactivateGuard, SnackBarService,
    ArticlesResponseCacheService, AuthAdminGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: ArticlesResponseCacheInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
