import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

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
import { SearchComponent } from './components/search/search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TrimPipe} from './trim.pipe';

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
    ArticleDetailComponent,
    SearchComponent,
    TrimPipe

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
    MatAutocompleteModule

  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
