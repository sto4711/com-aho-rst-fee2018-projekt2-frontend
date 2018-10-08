import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {BreadcrumbPath} from './components/breadcrumb/breadcrumb-path';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OverviewComponent} from './components/admin/overview/overview.component';
import {OrderService} from './services/order/order.service';
import {CanComponentDeactivateGuard} from './services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {InitAppResolverService} from './resolver/init-app-resolver-service';
import {AuthAdminGuardService} from "./services/auth-admin-guard/auth-admin-guard.service";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {UserService} from "./services/user/user.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [InitAppResolverService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
       },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'article-listing', component: ArticleListingComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('', 'OUR-ARTICLES')]}
      },
      {
        path: 'article-detail', component: ArticleDetailComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('article-listing', 'OUR-ARTICLES')]}
      },
      {
        path: 'my-account', component: MyAccountComponent,
        canDeactivate: [CanComponentDeactivateGuard],
        data: {breadcrumbPath: [new BreadcrumbPath('', 'MY-ACCOUNT')]}
      },
      {
        path: 'shopping-basket', component: ShoppingBasketComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('', 'MY-SHOPPING-BASKET')]}
      },
      {
        path: 'checkout', component: CheckoutComponent,
        canActivate: [OrderService],
        canDeactivate: [CanComponentDeactivateGuard],
        data: {breadcrumbPath: [new BreadcrumbPath('', 'CHECKOUT')]}
      },
      {
        path: 'my-orders', component: MyOrdersComponent,
        canActivate: [UserService],
        data: {breadcrumbPath: [new BreadcrumbPath('', 'MY-ORDERS')]}
      },
      {path: 'order-detail', component: OrderDetailComponent},
      {
        path: 'admin/overview', component: OverviewComponent,
        canActivate: [AuthAdminGuardService]}
    ]
  },
  {path: '**', component: NotFoundComponent}
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
