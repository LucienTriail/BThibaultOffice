import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailsProductComponent} from "./details-product.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [DetailsProductComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class DetailsProductModule { }
