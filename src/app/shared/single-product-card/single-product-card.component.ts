import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Products} from "../../core/interface/products";

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrls: ['./single-product-card.component.css']
})
export class SingleProductCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Products) { }

  ngOnInit(): void {
  }

}
