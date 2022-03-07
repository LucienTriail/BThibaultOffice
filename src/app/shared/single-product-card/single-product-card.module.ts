import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleProductCardComponent} from "./single-product-card.component";
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [SingleProductCardComponent],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class SingleProductCardModule { }
