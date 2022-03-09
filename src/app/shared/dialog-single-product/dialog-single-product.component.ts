import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SingleProductCardComponent} from "../single-product-card/single-product-card.component";
import {Products} from "../../core/interface/products";


@Component({
  selector: 'app-dialog-single-product',
  templateUrl: './dialog-single-product.component.html',
  styleUrls: ['./dialog-single-product.component.css']
})
export class DialogSingleProductComponent implements OnInit {

  ptest: Products ={
    "discount": 0,
    "name": "Huitres N°2 St Vaast",
    "id": 8,
    "owner": "tig",
    "comments": "",
    "availability": true,
    "category": 1,
    "price": 38,
    "price_on_sale": 38,
    "unit": "4 Dz",
    "sale": false,
    "quantity_stock": 20,
    "quantity_sold": 100
  } ;

  constructor(public dialog: MatDialog) { }

  openDialog(product:Products){
    this.dialog.open(
      SingleProductCardComponent);

  }

/*{
  data: {
    name:product.name,
    price:product.price
  },
}*/

  ngOnInit(): void {
  }

}
