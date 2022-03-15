import {AfterViewInit, Component, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {Products} from "../../core/interface/products";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../../core/services/api.service";
import {MatSelectChange} from "@angular/material/select";

export interface EmpFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

@Component({
  selector: 'app-stock-product',
  templateUrl:'./stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit, AfterViewInit  {


  productsList: Products[] | undefined ;
  displayedColumns: string[] = ['name', 'price','category', 'discount', 'stock'];
  // @ts-ignore
  dataSource: MatTableDataSource<Products> ;
  empFilters: EmpFilter[]=[];
  category: string[]=['0','1','2','3'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  private defaultValu: string | undefined;

  constructor(private productService : ApiService) {}

  ngOnInit(): void {
    this.getProducts();
    this.dataSource = new MatTableDataSource(products);
    this.empFilters.push({name:'category',options:this.category,defaultValue:''});
    this.dataSource.filterPredicate = function (record,filter) {

      var map = new Map(JSON.parse(filter));
      let isMatch = false;

      for(let [key,value] of map){
        isMatch = (value=="All") || (record[key as keyof Products] == value);
        if(!isMatch) return false;
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

  getProducts(){
    this.productService.getProducts().subscribe((response : Products[]) => {
        //https://angular.io/guide/http pour ameliorer la requete
        this.productsList = response;
        console.log(this.productsList);
      },
      () => {
        alert('no data');
      });
  }

  getProductsByCat( l_category: number){
    this.getProducts();
    this.productsList = this.productsList?.filter(x => x.category > l_category);
  }

  applyFilterA(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterDictionary= new Map<string,string>();

  applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {
    this.filterDictionary.set(empfilter.name,ob.value);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}




const products: Products[] = [{
  "comments": "",
  "category": 1,
  "availability": true,
  "id": 6,
  "price": 7,
  "price_on_sale": 6,
  "discount": 5,
  "sale": true,
  "owner": "tig",
  "unit": "kg",
  "name": "Moules de pêche",
  "stock": 20,
  "sold": 50
},
  {
    "id": 1,
    "unit": "2 filets",
    "category": 0,
    "name": "Filet Bar de ligne",
    "discount": 0,
    "comments": "environ 300g",
    "owner": "tig",
    "price": 7,
    "price_on_sale": 7,
    "sale": false,
    "availability": true,
    "stock": 60,
    "sold": 100
  },
  {
    "availability": false,
    "price": 7,
    "price_on_sale": 7,
    "discount": 0,
    "name": "Araignées",
    "comments": "Hors saison, pêche aux casiers",
    "id": 9,
    "owner": "tig",
    "unit": "kg",
    "category": 2,
    "sale": false,
    "stock": 30,
    "sold": 10
  },
  {
    "name": "Bouquets cuits",
    "sale": false,
    "id": 10,
    "category": 1,
    "price": 8,
    "price_on_sale": 8,
    "availability": false,
    "unit": "100g",
    "owner": "tig",
    "comments": "Hors saison, pêche à l'épuisette",
    "discount": 0,
    "stock": 40,
    "sold": 60
  },
  {
    "unit": "Dz",
    "comments": "",
    "availability": true,
    "category": 1,
    "id": 7,
    "name": "Huitres N°2 St Vaast",
    "price": 9.5,
    "price_on_sale": 9.5,
    "sale": false,
    "owner": "tig",
    "discount": 0,
    "stock": 20,
    "sold": 80
  },
  {
    "owner": "tig",
    "id": 2,
    "name": "Bar de ligne portion",
    "category": 0,
    "unit": "pièce",
    "comments": "Environ 550-700g la pièce",
    "sale": false,
    "price": 10,
    "price_on_sale": 10,
    "discount": 0,
    "availability": true,
    "stock": 10,
    "sold": 100
  },
  {
    "comments": "Pêche à la corde",
    "category": 0,
    "discount": 0,
    "id": 12,
    "name": "Aile de raie",
    "sale": false,
    "availability": true,
    "owner": "tig",
    "price": 10,
    "price_on_sale": 10,
    "unit": "kg",
    "stock": 20,
    "sold": 20
  },
  {
    "unit": "Dz",
    "sale": false,
    "price": 12,
    "price_on_sale": 12,
    "availability": true,
    "id": 13,
    "name": "Huîtres N°2 OR St Vaast",
    "discount": 0,
    "comments": "Médaille d'or Salon Agriculture",
    "category": 1,
    "owner": "tig",
    "stock": 20,
    "sold": 100
  },
  {
    "name": "Lieu jaune de ligne",
    "availability": true,
    "unit": "kg",
    "sale": false,
    "category": 0,
    "owner": "tig",
    "discount": 0,
    "comments": "Environ 550-700g la portion",
    "id": 4,
    "price": 12,
    "price_on_sale": 12,
    "stock": 30,
    "sold": 80
  },
  {
    "availability": false,
    "id": 5,
    "unit": "kg",
    "owner": "tig",
    "discount": 0,
    "price": 19,
    "price_on_sale": 19,
    "category": 0,
    "name": "Filet Julienne",
    "sale": false,
    "comments": "Pêche à la corde",
    "stock": 10,
    "sold": 70
  },
  {
    "sale": false,
    "category": 1,
    "price": 19,
    "price_on_sale": 19,
    "id": 16,
    "unit": "2 Dz",
    "discount": 0,
    "name": "Huîtres N°2 St Vaast",
    "owner": "tig",
    "availability": true,
    "comments": "",
    "stock": 20,
    "sold": 100
  },
  {
    "owner": "tig",
    "sale": false,
    "availability": true,
    "category": 1,
    "unit": "2 Dz",
    "discount": 0,
    "id": 14,
    "comments": "Médaille d'or salon agriculture",
    "price": 24,
    "price_on_sale": 24,
    "name": "Huîtres N°2 OR St Vaast",
    "stock": 20,
    "sold": 100
  },
  {
    "discount": 0,
    "availability": true,
    "owner": "tig",
    "name": "Bar de ligne",
    "category": 0,
    "sale": false,
    "comments": "Plus de 1.5kg le poisson",
    "id": 3,
    "unit": "kg",
    "price": 30,
    "price_on_sale": 30,
    "stock": 10,
    "sold": 100
  },
  {
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
    "stock": 20,
    "sold": 100
  },
  {
    "discount": 0,
    "name": "Huîtres N°2 OR St Vaast",
    "sale": false,
    "category": 1,
    "availability": true,
    "unit": "4 Dz",
    "comments": "Médaille d'or salon agriculture",
    "price": 48,
    "price_on_sale": 48,
    "owner": "tig",
    "id": 15,
    "stock": 20,
    "sold": 100
  }];
