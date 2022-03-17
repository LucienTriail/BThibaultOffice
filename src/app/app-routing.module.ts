import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailsProductComponent} from "./pages/details-product/details-product.component";
import {LoginComponent} from './pages/login/login.component';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {ErrorComponent} from "./pages/error/error.component";
import {UserDetailComponent} from "./pages/user-detail/user-detail.component";
import {TokenService} from "./core/services/token.service";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'accueil'},
  {path: 'details', component: DetailsProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accueil', component: AccueilComponent, canActivate: [TokenService]},
  {path: 'error', component: ErrorComponent},
  {path: 'user', component: UserDetailComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'accueil'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
