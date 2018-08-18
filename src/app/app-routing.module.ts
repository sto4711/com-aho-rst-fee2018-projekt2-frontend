import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from 'src/app/components/login/login.component';
import {UserComponent} from 'src/app/components/admin/user/user.component';
import {ProductComponent} from 'src/app/components/admin/product/product.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin/user', component: UserComponent},
  {path: 'admin/product', component: ProductComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
