import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../interface/products";
import {Users} from "../interface/users";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL : string = 'http://localhost:8000/';

  constructor(private http:HttpClient) { }

  //besoin de gerer la reponse, fait?
  login(user : Users){
    console.log('in api service, login method');
    console.log('in api service, login method. USER: ', user);
    return this.http.post<any>(this.BASE_URL + 'api/token/',user)
    .pipe(
      catchError((err) => {
        return throwError(err);
      })
     );

  }

  getSingleUser(id : number): Observable<Users>{
    return this.http.get<Users>(this.BASE_URL + 'users/' + id + '/')
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

getUsers(): Observable<Users[]>{
  return this.http.get<Users[]>(this.BASE_URL + 'users/')
    .pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

}

//on gerer les object-level permissions coté django
editSingleUser(user:Users): Observable<Users>{
  return this.http.put<Users>(this.BASE_URL + 'users/', user)
    .pipe(
      catchError((err) => {
        return throwError(err);
      })
    );

}



  getProducts(): Observable<Products[]>{
      return this.http.get<Products[]>(this.BASE_URL + "products/")
        .pipe(
          catchError((err) => {
            console.log('error caught in service')
            console.error(err);
            return throwError(err);
          })
        )
  }

  editSingleProduct(product:Products): Observable<Products>{
    return this.http.put<Products>(this.BASE_URL + 'products/' + product.id +'/', product)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );

  }
}
