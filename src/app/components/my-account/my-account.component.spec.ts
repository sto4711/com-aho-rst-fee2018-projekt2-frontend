import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountComponent } from './my-account.component';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthAdminGuardService} from '../../services/guards/auth-admin-guard.service';
import {ArticlesResponseCacheService} from '../../services/articles-response-cache/articles-response-cache.service';
import {BrowserModule} from '@angular/platform-browser';
import {CanComponentDeactivateGuard} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {MatComponentsModule} from '../../mat-components/mat-components.module';
import {LangSwitchComponent} from '../lang-switch/lang-switch.component';
import {NavigationCancelService} from '../../services/navigation-cancel/navigation-cancel.service';
import {LanguageService} from '../../services/language/language.service';
import {ShoppingBasketComponent} from '../shopping-basket/shopping-basket.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../header/header.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FooterComponent} from '../footer/footer.component';
import {SearchResultsComponent} from '../search-results/search-results.component';
import {ArticleListingComponent} from '../article-listing/article-listing.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {LoginInfoComponent} from '../login-info/login-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DeTrimPipe} from '../../pipes/de-trim.pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NotFoundComponent} from '../not-found/not-found.component';
import {InitAppService} from '../../services/init-app/init-app.service';
import {ShoppingBasketListingComponent} from '../shopping-basket-listing/shopping-basket-listing.component';
import {UserService} from '../../services/user/user.service';
import {DialogConfirmYesNoComponent} from '../commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import {TrimPipe} from '../../pipes/trim.pipe';
import {AmountConverterPipe} from '../../pipes/currency.pipe';
import {HttpLoaderFactory} from '../../app.module';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {CheckoutReadyGuardService} from '../../services/guards/checkout-ready-guard.service';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {AppRoutingModule} from '../../app-routing.module';
import {ArticlesCacheInterceptor} from '../../interceptors/articles-cache-interceptor';
import {SearchComponent} from '../search/search.component';
import {OverviewComponent} from '../admin/overview/overview.component';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {HomeComponent} from '../home/home.component';
import {MyOrdersComponent} from '../my-orders/my-orders.component';
import {APP_BASE_HREF} from '@angular/common';
import {ArticleDetailComponent} from '../article-detail/article-detail.component';
import {ErrorResponseInterceptor} from '../../interceptors/error-response-interceptor';
import {ArticleTemplateComponent} from '../article-template/article-template.component';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;

  beforeEach(async(() => {
     TestBed.configureTestingModule({
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
        MyOrdersComponent,
        SearchResultsComponent
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
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [InitAppService, UserService, LanguageService, CanComponentDeactivateGuard, SnackBarService,
        ArticlesResponseCacheService, AuthAdminGuardService, CheckoutReadyGuardService, NavigationCancelService,
        {provide: HTTP_INTERCEPTORS, useClass: ArticlesCacheInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true},
        {provide: APP_BASE_HREF, useValue: '/article-detail'}
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MyAccountComponent);
      component = fixture.componentInstance;
    });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a login form with 2 input fields', () => {
    expect(component.account.contains('email')).toBeTruthy();
    expect(component.account.contains('pwd')).toBeTruthy();

  });

  it('should make login form input fields required', () => {
    const controlName: AbstractControl = component.account.get('email');
    const controlPwd: AbstractControl = component.account.get('pwd');
    controlName.setValue('');
    controlPwd.setValue('');
    expect(controlName.valid).toBeTruthy();
    expect(controlPwd.valid).toBeTruthy();
  });

});
