import { Component, OnInit } from '@angular/core';
import {Products} from "../../core/interface/products";
import {ProductsService} from "../../core/services/products.service";
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  productsList: Products[] | undefined;
  displayedColumns: string[] = ['comments', 'name', 'price', 'discount'];
  data: MatTableDataSource<Products> | undefined;

  constructor(private productService : ProductsService, public dataSource: MatTableDataSource<Products>) { };


  ngOnInit(): void {
    this.getProducts();
    this.dataSource = new MatTableDataSource(this.productsList);

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getProducts(){
    this.productService.getProductsFromJson().subscribe((res : Products[]) => {
  //https://angular.io/guide/http pour ameliorer la requete

  this.productsList = res
        // console.log(this.productsList);
  },
  (err) => {
  alert('no data');
  });
  }

  getProductsByCat( category: number){
    this.getProducts();
    this.productsList = this.productsList?.filter(x => x.category > category);
  }
}
