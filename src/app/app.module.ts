import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProductsService} from "./core/services/products.service";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {DialogSingleProductModule} from "./shared/dialog-single-product/dialog-single-product.module";
import {SingleProductCardModule} from "./shared/single-product-card/single-product-card.module";
import {HeaderModule} from "./shared/header/header.module";
import {BasicButtonModule} from "./shared/buttons/basic-button/basic-button.module";
import {DetailsProductModule} from "./pages/details-product/details-product.module";
import {FooterModule} from "./shared/footer/footer.module";

import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    MatTableModule,
    DialogSingleProductModule,
    SingleProductCardModule,
    HeaderModule,
    BasicButtonModule,
    DetailsProductModule,
    FooterModule

  ],

  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
