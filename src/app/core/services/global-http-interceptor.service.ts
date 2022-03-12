import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Router,NavigationExtras} from "@angular/router";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  //private?
  constructor(public router: Router) {
  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = 'invalid token';
    req = req.clone({ headers: req.headers.set('Authorization', token) });
    //const extra : NavigationExtras = {};

    return next.handle(req).pipe
    (
      catchError(
        (error) => {

        let handled: boolean = false;

        if (error instanceof HttpErrorResponse) {

          if (error.error instanceof ErrorEvent) {
            console.error("Error Event, not HTTP related");
          }
          else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            const extra : NavigationExtras = {
              state : {
                status: error.status
              }
            };
            switch (error.status) {
             case 401:      //login


                this.router.navigate(["/error"],extra);
                console.log(`redirect to login`);
                handled = true;
                break;

              case 403:     //forbidden
                this.router.navigate(["/error"],extra);
                console.log(`redirect to login`);
                handled = true;
                break;
              case 500:     //server error
                this.router.navigate(["/error"],extra);
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
