import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
    declarations: [AccueilComponent],
    imports: [
      CommonModule,
      MatTabsModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      })
    ]
  })
  export class AccueilModule { }