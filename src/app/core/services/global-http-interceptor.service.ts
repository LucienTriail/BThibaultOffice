import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ToastService} from "./toast.service";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {


  constructor(public router: Router, private toast: ToastService) {
  }

  /*
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
       */
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
