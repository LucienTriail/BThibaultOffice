import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ApiService} from "./core/services/api.service";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './pages/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { LoginModule } from './pages/login/login.module';
import { AccueilModule } from './pages/accueil/accueil.module';
import { JwtModule } from "@auth0/angular-jwt";
import {GlobalHttpInterceptorService} from "./core/services/global-http-interceptor.service";
import {GlobalErrorHandlerService} from "./core/services/global-error-handler.service";
import {ErrorModule} from "./pages/error/error.module";
import {UserDetailModule} from "./pages/user-detail/user-detail.module";
import {StockProductComponent} from "./pages/stock-product/stock-product.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatInputModule} from "@angular/material/input";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


let schemas;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockProductComponent
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
    FooterModule,
    LoginModule,
    AccueilModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8000"],
        disallowedRoutes: [],
      },
    }),
    ErrorModule,
    UserDetailModule,
    MatInputModule

  ],

  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  },
    { provide: ErrorHandler, useClass:GlobalErrorHandlerService}
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

