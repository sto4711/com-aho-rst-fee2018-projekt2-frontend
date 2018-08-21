import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoComponent } from './components/todo/todo.component';
import { UserComponent } from './components/admin/user/user.component';
import { ProductComponent } from './components/admin/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {LoginService} from './services/login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    TodoComponent,
    UserComponent,
    ProductComponent,
    HomeComponent,
    ArticleListingComponent,
    MyAccountComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
