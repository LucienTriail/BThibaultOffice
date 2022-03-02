import { Component, OnInit } from '@angular/core';
import {Products} from "../../interface/products";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  productsList:Products[] | undefined;

  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
this.productService.getProductsFromJson().subscribe((res : Products[]) => {
  //https://angular.io/guide/http pour ameliorer la requete
this.productsList = res;
console.log(this.productsList);
  },
  (err) => {
  alert('no data');
  });
  }

}
