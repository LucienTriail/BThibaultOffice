import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Products} from "../../core/interface/products";
import {ApiService} from "../../core/services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DialogSingleProductComponent} from "../../shared/dialog-single-product/dialog-single-product.component";

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit, AfterViewInit {


  // @ts-ignore
  productsList: Products[];
  displayedColumns: string[] = ['name'];
  // @ts-ignore
  dataSource: MatTableDataSource<Products>;
  //dataSource = new MatTableDataSource(products);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private productService: ApiService, private dialog: DialogSingleProductComponent) {
  };

  openDialog(item: Products) {
    this.dialog.openDialog(item);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe((response: Products[]) => {
        //https://angular.io/guide/http pour ameliorer la requete

        this.productsList = response;
        this.dataSource = new MatTableDataSource(response);

        console.log(this.productsList);
      },
      () => {
        alert('no data');
      });
  }

  getProductsByCat(l_category: string) {
    this.getProducts();
    this.productsList = this.productsList?.filter(x => x.category > l_category);
  }
}


