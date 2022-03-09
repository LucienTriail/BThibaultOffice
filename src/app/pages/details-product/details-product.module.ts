import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailsProductComponent} from "./details-product.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [DetailsProductComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule
  ]
})
export class DetailsProductModule { }
