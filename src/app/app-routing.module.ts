import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DetailsProductComponent} from "./pages/details-product/details-product.component";
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import {ErrorComponent} from "./pages/error/error.component";
import {PageNotFoundComponent} from "./pages/error/page-not-found/page-not-found.component";


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'accueil'},
  {path:'home', component:HomeComponent},
  {path:'details', component:DetailsProductComponent},
  {path:'login',component:LoginComponent},
  {path:'accueil',component:AccueilComponent},
  {path:'error',component:ErrorComponent},
  { path: '**', pathMatch: 'full',
    component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
