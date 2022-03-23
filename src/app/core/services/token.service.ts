import {Injectable} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CanActivate, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService implements CanActivate {
  BASE_URL: string = 'http://localhost:8000/';

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
  }

  async canActivate() {
    const token: string | null = localStorage.getItem("access");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    const isRefreshSuccess: boolean = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["/login"]);
    }

    return isRefreshSuccess;
  }

  async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refresh");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({refresh: refreshToken});

    let isRefreshSuccess: boolean;
    try {

      const response = await lastValueFrom(this.http.post(this.BASE_URL + 'api/token/refresh/', tokenModel));
      const newToken = (<any>response).access;
      const newRefreshToken = (<any>response).refresh;
      localStorage.setItem("access", newToken);
      localStorage.setItem("refresh", newRefreshToken);
      isRefreshSuccess = true;
    } catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}
