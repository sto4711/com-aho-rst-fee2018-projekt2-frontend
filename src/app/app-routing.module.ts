import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from 'src/app/components/admin/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {ArticleComponent} from './components/admin/article/article.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {BreadcrumbPath} from "./components/breadcrumb/breadcrumb-path";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'article-listing', component: ArticleListingComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'Unsere Artikel')]
    }
  },
  {
    path: 'article-detail', component: ArticleDetailComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('article-listing', 'Unsere Artikel')]
    }
  },
  {
    path: 'my-account', component: MyAccountComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'Mein Konto')]
    }
  },
  {
    path: 'shopping-basket', component: ShoppingBasketComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'Mein Warenkorb')]
    }
  },
  {path: 'order-detail', component: OrderDetailComponent},
  {path: 'admin/user', component: UserComponent},
  {path: 'admin/article', component: ArticleComponent},
  {path: '**', component: NotFoundComponent},

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
