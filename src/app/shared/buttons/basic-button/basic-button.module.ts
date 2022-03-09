import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasicButtonComponent} from "./basic-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [BasicButtonComponent],
  exports: [
    BasicButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class BasicButtonModule { }
