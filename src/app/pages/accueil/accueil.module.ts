import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';







@NgModule({
    declarations: [AccueilComponent],
    imports: [
      CommonModule,
      MatTabsModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      }),
      MatDatepickerModule,
      MatFormFieldModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      MatChipsModule
     
    ]
  })
  export class AccueilModule { }