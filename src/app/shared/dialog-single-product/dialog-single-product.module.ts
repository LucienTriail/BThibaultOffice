import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogSingleProductComponent} from "./dialog-single-product.component";
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [DialogSingleProductComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class DialogSingleProductModule { }
