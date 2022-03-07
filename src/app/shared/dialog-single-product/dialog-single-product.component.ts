import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SingleProductCardComponent} from "../single-product-card/single-product-card.component";


@Component({
  selector: 'app-dialog-single-product',
  templateUrl: './dialog-single-product.component.html',
  styleUrls: ['./dialog-single-product.component.css']
})
export class DialogSingleProductComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(){
    this.dialog.open(
      SingleProductCardComponent,{
        data: {
          animal:"panda",
        },
      });

  }



  ngOnInit(): void {
  }

}
