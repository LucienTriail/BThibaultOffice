import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponent} from "./error.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";



@NgModule({
  declarations: [ErrorComponent,PageNotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
