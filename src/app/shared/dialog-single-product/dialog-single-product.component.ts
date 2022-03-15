import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SingleProductCardComponent} from "../single-product-card/single-product-card.component";
import {Products} from "../../core/interface/products";


@Component({
  selector: 'app-dialog-single-product',
  templateUrl: './dialog-single-product.component.html',
  styleUrls: ['./dialog-single-product.component.css']
})
@Injectable({providedIn: 'root'})
export class DialogSingleProductComponent implements OnInit {


  constructor(public dialog: MatDialog) {
  }

  openDialog(product: Products) {
    this.dialog.open(
      SingleProductCardComponent, {
        data: {
          name: product.name,
          price: product.price,
          discounted_price: product.discounted_price,
          discount: product.discount,
          stock: product.stock,
          sold: product.sold,
          comments: product.comments,
          id: product.id,
          unit: product.unit,
          category: product.category


        },
      });
    console.log('Dans dialog single product: ', product);
  }


  ngOnInit(): void {
  }

}


