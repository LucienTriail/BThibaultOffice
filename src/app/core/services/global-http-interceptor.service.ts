import {Injectable} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ApiService} from "./api.service";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  //private?
  constructor(public router: Router, private api: ApiService) {
  }

  tokenGetter(): string | null {
    return localStorage.getItem("access");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let accessToken: string | null = this.tokenGetter();
    if (accessToken) {
      console.log('TOKEN', accessToken);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      const isExpired = helper.isTokenExpired(accessToken);
      console.log('DECODED POLOLO : ', decodedToken);
      if (isExpired) {
        this.api.refreshAccessToken().subscribe((data: any) => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          accessToken = data.access;
        });
      }

      req = req.clone({withCredentials: true, headers: req.headers.set('Authorization', "Bearer " + accessToken)});
    }
    return next.handle(req).pipe
    (
      catchError(
        (error) => {

          let handled: boolean = false;

          if (error instanceof HttpErrorResponse) {

            if (error.error instanceof ErrorEvent) {
              console.error("Error Event, not HTTP related");
            } else {
              console.log(`error status : ${error.status} ${error.statusText}`);
              const extra: NavigationExtras = {
                state: {
                  status: error.status
                }
              };
              switch (error.status) {

                case 404:     //not found
                  this.router.navigate(["/error"], extra);
                  console.log(`redirect to login`);
                  handled = true;
                  break;
                case 401:      //login


                  this.router.navigate(["/login"]);
                  console.log(`redirect to login`);
                  handled = true;
                  break;

                case 403:     //forbidden
                  this.router.navigate(["/error"], extra);
                  console.log(`redirect to login`);
                  handled = true;
                  break;
                case 500:     //server error
                  this.router.navigate(["/error"], extra);
                  console.log(`redirect to login`);
                  handled = true;
                  break;


              }
            }
          }

          if (handled) {
            console.log('Redirecting');
            return of(error);
          } else {
            console.log('error not handled, throwing back to to the subscriber');
            return throwError(error);
          }

        })
    )

  }
}
