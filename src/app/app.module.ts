import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TrimPipe} from './trim.pipe';
import { ShoppingBasketPlayComponent } from './components/shopping-basket-play/shopping-basket-play.component';
import { ArticleComponent } from './components/admin/article/article.component';
import { DialogConfirmComponent } from './components/commons/dialog/dialog-confirm/dialog-confirm.component';
import {ErrorHandlerService} from "./services/commons/error/error-handler.service";
import {MatSelectModule} from '@angular/material/select';

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
    ShoppingBasketPlayComponent,
    ArticleComponent,
    DialogConfirmComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule
  ],
  entryComponents: [
    DialogConfirmComponent ],
  providers: [LoginService, { provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent]
})

export class AppModule { }
