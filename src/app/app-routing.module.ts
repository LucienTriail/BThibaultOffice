import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DetailsProductComponent} from "./pages/details-product/details-product.component";
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'details', component:DetailsProductComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
