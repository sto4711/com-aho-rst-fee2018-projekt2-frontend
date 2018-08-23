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
import { HomeComponent } from './components/home/home.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {LoginService} from './services/login/login.service';
import { ArticleComponent } from './components/admin/article/article.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    TodoComponent,
    UserComponent,
    ArticleComponent,
    HomeComponent,
    ArticleListingComponent,
    MyAccountComponent,
    ArticleComponent,
    ArticleDetailComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
