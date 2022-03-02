import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DetailsProductComponent} from "./pages/details-product/details-product.component";

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'details', component:DetailsProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
