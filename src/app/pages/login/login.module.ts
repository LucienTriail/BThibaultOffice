import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BasicButtonModule } from 'src/app/shared/buttons/basic-button/basic-button.module';
import { MatInputModule } from '@angular/material/input';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    BasicButtonModule,
    MatInputModule,
    FooterModule,
    FormsModule
  ]
})
  export class LoginModule { }
