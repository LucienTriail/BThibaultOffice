import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockProductComponent} from "./stock-product.component";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [StockProductComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StockProductModule { }
