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
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'article-listing', component: ArticleListingComponent,
    data: {
      breadcrumbPath: [{'mainUrl': '', 'breadcrumb': 'Unsere Artikel'} ]

    }
  },

  {path: 'article-detail', component: ArticleDetailComponent,
    data: {
         breadcrumbPath: [{'mainUrl': 'article-listing', 'breadcrumb': 'Unsere Artikel'} ]
    }
  },
  {path: 'my-account', component: MyAccountComponent,
    data: {
      breadcrumbPath: [{'mainUrl': '', 'breadcrumb': 'Mein Konto'} ]

    }
    },
  {path: 'shopping-basket-play', component: ShoppingBasketPlayComponent,
    data: {
      breadcrumbPath: [{'mainUrl': '', 'breadcrumb': 'Mein Warenkorb'} ]

    }},
  {path: 'order-detail', component: OrderDetailComponent},
  {path: 'admin/user', component: UserComponent},
  {path: 'admin/article', component: ArticleComponent},

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
