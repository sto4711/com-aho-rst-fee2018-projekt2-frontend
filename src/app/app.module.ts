import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './components/admin/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {LoginService} from './services/login/login.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SearchComponent } from './components/search/search.component';
import {TrimPipe} from './trim.pipe';
import { ShoppingBasketPlayComponent } from './components/shopping-basket-play/shopping-basket-play.component';
import { ArticleComponent } from './components/admin/article/article.component';
import { DialogConfirmComponent } from './components/commons/dialog/dialog-confirm/dialog-confirm.component';
import {AmountConverterPipe} from './currency.pipe';
import { ArticleTemplateComponent } from './components/article-template/article-template.component';
import {MatComponentsModule} from './mat-components/mat-components.module';
import { HeaderComponent } from './components/header/header.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogConfirmDeleteComponent } from './components/commons/dialog/dialog-confirm-delete/dialog-confirm-delete.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ArticleListingComponent,
    MyAccountComponent,
    ArticleDetailComponent,
    SearchComponent,
    TrimPipe,
    AmountConverterPipe,
    ShoppingBasketPlayComponent,
    ArticleComponent,
    DialogConfirmComponent,
    ArticleTemplateComponent,
    HeaderComponent,
    TopBarComponent,
    FooterComponent,
    DialogConfirmDeleteComponent,
    OrderDetailComponent,
    CheckoutComponent,
    BreadcrumbComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule

  ],
  entryComponents: [
    DialogConfirmComponent, ShoppingBasketPlayComponent, DialogConfirmDeleteComponent ],
  providers: [LoginService, {provide: LOCALE_ID, useValue: "de-CH"},

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
