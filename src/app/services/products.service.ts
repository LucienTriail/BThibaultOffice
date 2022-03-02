import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../interface/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProductsFromJson(){
    return this.http.get<Products[]>("../assets/data/products.json");

  }

  getProduit(id:number){

  }
}
