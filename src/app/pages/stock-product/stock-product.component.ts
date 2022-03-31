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
import {StockTransac} from "../../core/interface/stock-transac";
import {EmpFilter} from "../../core/interface/emp-filter";

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit, AfterViewInit {


  productsList: Products[] | undefined;
  lstStockTransac: StockTransac[] = [];
  displayedColumns: string[] = ['product.name', 'product.price', 'category', 'product.discount', 'stockBis', 'operation'];
  // @ts-ignore

  dataSource: MatTableDataSource<StockTransac>;
  empFilters: EmpFilter[] = [];
  bool: boolean = false;
  category: string[] = ['All', 'poissons', 'crustacés'];
  defaultValue = '';
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
  filterDictionary = new Map<string, string>();

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.lData();
    //this.loadData();
    console.log("dans ng onInit, data source", this.dataSource.data);
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

  }

  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter) {
    this.filterDictionary.set(empfilter.name, ob.value);
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.bool = true;


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  lData() {
    let lstT: StockTransac[] = [];
    this.api.getProducts().subscribe((data) => {
      for (let product of data) {
        let stockTrans = {} as StockTransac;
        stockTrans.product = product;
        stockTrans.category = product.category;
        lstT.push(stockTrans);
      }

    });
    this.dataSource = new MatTableDataSource(lstT);
    //return lstT;
  }


  save() {
    let lstStockManage = this.dataSource.data;
    console.log('lst stockmanage', lstStockManage)
    let lstProducts: Products[] = [];
    let lstTransactions: Transactions[] = [];
    let changeProd = false;

    for (let trans of lstStockManage) {
      if (trans.stockBis > 0) {
        console.log('trans.operation', trans.operation)
        switch (trans.operation) {
          case'Achat':
            console.log('stock', trans.product.stock);
            console.log('stockBIS', trans.stockBis);

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

      if (changeProd && trans.operation != null) { //
        let newTransac: Transactions = {
          date: "",
          productQuantity: 0,
          operation: "",
          amount: 0,
          category: "",
          product: 0,

        }; //as Transactions;
        console.log('newtransac', newTransac)
        newTransac.product = trans.product.id;
        newTransac.date = new Date().toISOString();
        newTransac.productQuantity = trans.stockBis;
        newTransac.operation = <string>trans.operation;
        newTransac.amount = trans.product.price * trans.stockBis;
        newTransac.category = trans.product.category.toString();

        lstTransactions.push(newTransac);
      }
      lstProducts.push(trans.product);
    }
    console.log('lst TRansac', lstTransactions)

    this.api.editProductList(lstProducts).subscribe((data) => {
      // console.log('APRES VALIDATION product', data);
    });
    this.api.editTransactionsList(lstTransactions).subscribe((data) => {
      //  console.log('APRES VALIDATION transac', data);
    });

  }

  loadData() {
    //this.lstStockTransac  = this.lData();
    this.dataSource = new MatTableDataSource(this.lstStockTransac);
    console.log('dans load data', this.lstStockTransac)
  }
}
