import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Products} from "../../core/interface/products";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../../core/services/api.service";
import {MatSelectChange} from "@angular/material/select";
import {MyErrorStateMatcher} from "../../shared/single-product-card/single-product-card.component";
import {FormControl, Validators} from "@angular/forms";
import {Transactions} from "../../core/interface/transaction";

export interface EmpFilter {
  name: string;
  options: string[];
  defaultValue: string;
}

export interface StockTransac {
  product: Products,
  category: number,
  stockBis: number,
  operation?: string
}

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit, AfterViewInit {


  productsList: Products[] | undefined;
  lstStockTransac: StockTransac[] = [];
  displayedColumns: string[] = ['product.name', 'product.price', 'category', 'product.discount', 'product.stock', 'operation'];
  // @ts-ignore
  dataSource: MatTableDataSource<StockTransac>;
  empFilters: EmpFilter[] = [];
  category: string[] = ['0', '1', '2', '3'];
  operations = [
    {value: ''},
    {value: 'Achat'},
    {value: 'Vente'},
    {value: 'Mis au rebut'}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  //Match error of Mat Input field
  matcher = new MyErrorStateMatcher();
  percentageDiscountFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  quantityFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  filterDictionary = new Map<string, StockTransac>();

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.empFilters.push({name: 'category', options: this.category, defaultValue: ''});
    this.dataSource.filterPredicate = function (record, filter) {

      var map = new Map(JSON.parse(filter));
      let isMatch = false;

      for (let [key, value] of map) {
        isMatch = (value == "All") || (record[key as keyof StockTransac] == value);
        if (!isMatch) return false;
      }

      return isMatch;
    }
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }


  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter) {
    this.filterDictionary.set(empfilter.name, ob.value);
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData() {
    /*  for (let product of products) {
        let stockTrans = {} as StockTransac;
        stockTrans.product = product;
        stockTrans.category = product.category;
        this.lstStockTransac.push(stockTrans);
      }
      this.dataSource = new MatTableDataSource(this.lstStockTransac);*/


    this.api.getProducts().subscribe((data) => {
      for (let product of data) {
        let stockTrans = {} as StockTransac;
        stockTrans.product = product;
        stockTrans.category = product.category;
        this.lstStockTransac.push(stockTrans);
      }

      this.dataSource = new MatTableDataSource(this.lstStockTransac);

    });

  }


  save() {
    let lstStockManage = this.dataSource.data;
    let lstProducts: Products[] = [];
    let lstTransactions: Transactions[] = [];
    let changeProd = false;

    for (let trans of lstStockManage) {
      if (trans.stockBis > 0) {
        switch (trans.operation) {
          case'Achat':
            trans.product.stock += trans.stockBis;
            changeProd = true;
            break;
          case'Vente':
            trans.product.stock -= trans.stockBis;
            changeProd = true;
            break;
          case'Mis au rebut':
            trans.product.stock -= trans.stockBis;
            changeProd = true;
            break;
        }
      }

      if (changeProd && trans.operation != null) {
        let newTransac: Transactions = {
          date: "",
          productQuantity: 0,
          operation: "",
          amount: 0,
          category: "",
          product: 0,

        }; //as Transactions;
        newTransac.product = trans.product.id;
        newTransac.date = new Date().toISOString();
        newTransac.productQuantity = trans.stockBis;
        newTransac.operation = <string>trans.operation;
        newTransac.amount = trans.product.price * trans.stockBis;
        newTransac.category = trans.product.category.toString();

        console.log('STRINGIFIED ', JSON.stringify(newTransac));
        lstTransactions.push(newTransac);
      }
      lstProducts.push(trans.product);

    }
    console.log("Les nouvelles transactions : ", lstTransactions);
    console.log("Les Produits :  : ", lstProducts);
    this.api.editTransactionsList(lstTransactions).subscribe((data) => {
      console.log('APRES VALIDATION ', data);
    })

  }

}


