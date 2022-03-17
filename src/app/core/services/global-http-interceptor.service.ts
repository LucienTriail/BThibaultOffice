import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ApiService} from "./api.service";
import {ToastService} from "./toast.service";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {


  constructor(public router: Router, private api: ApiService, private toast: ToastService) {
  }

  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let accessToken: string | null = this.tokenService.getAccessToken();


    console.log('TOKEN', accessToken);
    const helper = new JwtHelperService();
    // @ts-ignore
    const decodedToken = helper.decodeToken(accessToken);
    // @ts-ignore
    const expirationDate = helper.getTokenExpirationDate(accessToken);
    // @ts-ignore
    const isExpired = helper.isTokenExpired(accessToken);
    console.log('expirationdate: ', expirationDate);
    console.log('expiration in ms ', expirationDate?.getTime())
    console.log('datenow ', Date.now());
    // @ts-ignore
    console.log('datenow ', Date.now() - expirationDate?.getTime());

    // @ts-ignore

    if (expirationDate.getTime() - Date.now() <= 10000) {
      console.log('in if');
      this.tokenService1.getRefreshToken().subscribe((data: Token) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);


        accessToken = data.access;
      });
    } else {
      console.log('else');
    }
    req = req.clone({withCredentials: true, headers: req.headers.set('Authorization', "Bearer " + accessToken)});


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
                  console.log(`redirect to error`);
                  handled = true;
                  break;
                case 401:      //login


                  this.toast.showError('Mauvais identifiant ou mot de passe');
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

  }*/
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    request = request.clone({withCredentials: true, headers: request.headers.set('Content-Type', 'application/json')});
    let token: string | null = localStorage.getItem("access");
    if (token) {
      console.log('token in intercept: ', token);
      request = request.clone({
        withCredentials: true,
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return next.handle(request);
  }

}
