import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SingleProductCardComponent} from "./single-product-card.component";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [SingleProductCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class SingleProductCardModule { }
