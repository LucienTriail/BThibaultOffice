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

  getProduit(id:number){

  }
}
