import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProductsService} from "./core/services/products.service";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DetailsProductComponent } from './pages/details-product/details-product.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import { BasicButtonComponent } from './shared/buttons/basic-button/basic-button.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatCardModule} from '@angular/material/card';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailsProductComponent,
    BasicButtonComponent,
    LoginComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatTabsModule
    
    
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

