import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from 'src/app/components/admin/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {ShoppingBasketPlayComponent} from './components/shopping-basket-play/shopping-basket-play.component';
import {ArticleComponent} from './components/admin/article/article.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'article-listing', component: ArticleListingComponent},
  {path: 'article-detail', component: ArticleDetailComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'admin/user', component: UserComponent},
  {path: 'admin/article', component: ArticleComponent},
  {path: 'shopping-basket-play', component: ShoppingBasketPlayComponent},
  {path: 'order-detail', component: OrderDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeComponent},

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
