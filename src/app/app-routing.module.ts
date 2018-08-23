import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from 'src/app/components/login/login.component';
import {UserComponent} from 'src/app/components/admin/user/user.component';
import {ArticleComponent} from 'src/app/components/admin/article/article.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'article-listing', component: ArticleListingComponent},
  {path: 'article-detail/:articlename', component: ArticleDetailComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'admin/user', component: UserComponent},
  {path: 'admin/article', component: ArticleComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
