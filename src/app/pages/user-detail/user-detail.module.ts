import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDetailComponent} from "./user-detail.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {BasicButtonModule} from "../../shared/buttons/basic-button/basic-button.module";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    BasicButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class UserDetailModule { }
