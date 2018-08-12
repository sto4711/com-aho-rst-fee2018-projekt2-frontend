import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { AppRoutingModule } from './/app-routing.module';
import { DoToComponent } from './components/do-to/do-to.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    DoToComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
