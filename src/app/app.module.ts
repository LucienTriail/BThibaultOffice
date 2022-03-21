import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ApiService} from "./core/services/api.service";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogSingleProductModule} from "./shared/dialog-single-product/dialog-single-product.module";
import {SingleProductCardModule} from "./shared/single-product-card/single-product-card.module";
import {HeaderModule} from "./shared/header/header.module";
import {BasicButtonModule} from "./shared/buttons/basic-button/basic-button.module";
import {DetailsProductModule} from "./pages/details-product/details-product.module";
import {FooterModule} from "./shared/footer/footer.module";
import { LoginModule } from './pages/login/login.module';
import { AccueilModule } from './pages/accueil/accueil.module';
import {ErrorModule} from "./pages/error/error.module";
import {UserDetailModule} from "./pages/user-detail/user-detail.module";
import {ToastrModule} from 'ngx-toastr';
import {GlobalHttpInterceptorService} from "./core/services/global-http-interceptor.service";
import {GlobalErrorHandlerService} from "./core/services/global-error-handler.service";
import {TokenService} from "./core/services/token.service";
import {StockProductModule} from "./pages/stock-product/stock-product.module";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogSingleProductModule,
    SingleProductCardModule,
    HeaderModule,
    BasicButtonModule,
    DetailsProductModule,
    FooterModule,
    LoginModule,
    AccueilModule,
    ErrorModule,
    UserDetailModule,
    ToastrModule.forRoot()

    UserDetailModule,
    StockProductModule,
    FormsModule,
  ],

  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  },
    { provide: ErrorHandler, useClass:GlobalErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

