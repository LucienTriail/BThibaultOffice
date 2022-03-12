import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponent} from "./error.component";
import {HeaderModule} from "../../shared/header/header.module";



@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    HeaderModule
  ]
})
export class ErrorModule { }
