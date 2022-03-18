import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../interface/products";
import {Users} from "../interface/users";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Transactions} from '../interface/transaction';
import {Token} from "../interface/token";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  BASE_URL: string = 'http://localhost:8000/';


  constructor(private http: HttpClient) {
  }

  async deleteAndOrSetTokens(token: Token) {
    /* localStorage.removeItem(key);
     localStorage.removeItem(key1);
     if (typeof accessToken != 'undefined' && typeof refreshToken != 'undefined') {
       localStorage.setItem(key, accessToken);
       localStorage.setItem(key1, refreshToken);

       key: string, key1: string, accessToken?: any, refreshToken?: any

     }*/

    await localStorage.removeItem("access");
    await localStorage.removeItem("refresh");
    await localStorage.setItem("access", token.access);
    await localStorage.setItem("refresh", token.refresh);

  }


  logout() {
    // let refreshToken = this.token.getRefreshToken();
    // const body = {"refresh": refreshToken};
    const body = 'plop';
    return this.http.post(this.BASE_URL + 'logout/', body)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  //besoin de gerer la reponse, fait?
  login(user: Users): Observable<Token> {
    console.log('in api service, login method');
    console.log('in api service, login method. USER: ', user.username);
    console.log('in api service, login method. USER: ', user.password);
    return this.http.post<Token>(this.BASE_URL + 'api/token/', user)
      .pipe(
        catchError((err) => {
          console.log('login error: ', err);
          return throwError(err);
        })
      );

  }

  getSingleUser(): Observable<Users> {
    let pk: string = this.getUserId();
    return this.http.get<Users>(this.BASE_URL + 'users/' + pk)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.BASE_URL + 'users/')
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );

  }

//on gerer les object-level permissions coté django
  editSingleUser(user: Users): Observable<Users> {


    let pk: string = this.getUserId();
    return this.http.put<Users>(this.BASE_URL + 'users/' + pk, user)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );

  }


  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.BASE_URL + "products/")
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      )
  }

  getTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(this.BASE_URL + "transactions/")
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      )
  }

  editSingleProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(this.BASE_URL + 'products/' + product.id, product)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );

  }

  getUserId(): string {
    const helper = new JwtHelperService();
    let token: any = localStorage.getItem("access");
    let decodedToken = helper.decodeToken(token);

    console.log('decodedToken: ', decodedToken.user_id);

    return decodedToken.user_id;
  }


}
