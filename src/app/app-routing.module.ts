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
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ClientContextService} from "./services/client-context/client-context.service";
import {OverviewComponent} from './components/admin/overview/overview.component';
import {CheckoutResolverService} from "./services/route-resolver/checkout-resolver.service";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'article-listing', component: ArticleListingComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'OUR-ARTICLES')]
    }
  },
  {
    path: 'article-detail', component: ArticleDetailComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('article-listing', 'OUR-ARTICLES')]
    }
  },
  {
    path: 'my-account', component: MyAccountComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'MY-ACCOUNT')]
    }
  },
  {
    path: 'shopping-basket', component: ShoppingBasketComponent,
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'MY-SHOPPING-BASKET')]
    }
  },
  {
    path: 'checkout', component: CheckoutComponent,
    resolve: {StartUpResolverService: CheckoutResolverService},
    data: {
      breadcrumbPath: [new BreadcrumbPath('', 'CHECKOUT')]
    }
  },
  {path: 'order-detail', component: OrderDetailComponent},
  {path: 'admin/overview', component: OverviewComponent},
  {path: '**', component: NotFoundComponent,}
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
