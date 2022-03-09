import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {BasicButtonModule} from "../buttons/basic-button/basic-button.module";
import {MatButtonModule} from "@angular/material/button";







@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
BasicButtonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HeaderModule { }
