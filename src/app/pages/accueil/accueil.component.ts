import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import { Transactions } from 'src/app/core/interface/transaction';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { end } from '@popperjs/core';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  options: any;
  options2 : any;
  updateOptions:any;
  updateOptions2:any;
  revenue: number[] = [];
  profit: number[] = [];
  products: string[] = [];
  productsSold: number[] = [];
  productsStock: number[] = [];

  transactionsList: Transactions[] = [];

  calendar : string[]=[];





  constructor(private api:ApiService) {

  }
  // @ts-ignore 
  transactionsList:Transactions[];
  getTransactions(){
    this.api.getTransactions().subscribe((data) => {
      this.transactionsList=data;
      console.log(this.transactionsList);
      this.initTotalSales();
    });

  }


  filterDate(dateStart : string ,dateEnd : string){
    var startDate = new Date(dateStart);
    var endDate = new Date(dateEnd);

    return this.transactionsList.filter(item => {
      let date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });

 }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log('type daterangechange',typeof dateRangeStart.value);
    console.log('type daterangechange',typeof dateRangeEnd.value);
    let dateStart :Date=new Date(dateRangeStart.value);
    let dateEnd : Date=new Date(dateRangeEnd.value);
    console.log('type daterangechange',typeof dateStart);
    console.log('type daterangechange',typeof dateEnd);
    this.filterDate(dateRangeStart.value,dateRangeEnd.value);
   // this.updateTotalSales(dateRangeStart.value , dateRangeEnd.value);
   let datetri=this.filterDate(dateRangeStart.value,dateRangeEnd.value);
   this.sortByDate(datetri);
   for(let i=0;i<datetri.length;i++)console.log(datetri[i]);

   //console.log("tableau"+ datetri);

  }

sortByDate(array: Transactions[]){
  array.sort(function compare(a,b){
    if(a.date < b.date){
      return -1;
    }
    if(a.date>b.date){
      return 1;
    }
    return 0;
  });

}

  updateRevenueAndProfit(){
    console.log("production"+this.transactionsList.length);
    for(let i=0;i<this.transactionsList.length;i++){
      console.log(this.transactionsList[i].amount);
    }
   
    //console.log(this.transactionsList);

    for(let i=0;i<this.transactionsList.length;i++){
      this.revenue[i]=this.transactionsList[i].amount;
    }
    for(let i =0;i<this.revenue.length;i++){
      let temp=(this.revenue[i]*0.3);
      this.profit[i]=this.revenue[i]-temp;
      console.log("profit"+this.profit[i]);
    }
  }
  updateDate(){
    for(let i=0;i<this.transactionsList.length;i++){
      let date :Date=new Date(this.transactionsList[i].date);
      console.log('date',typeof date);

      let day:number=date.getDate();
      let mois:number=date.getUTCMonth()+1;
      let year:number=date.getUTCFullYear();
      
      
      this.calendar[i]=day+"-"+mois+"-"+year;
    }
  }
  

  updateTotalSales(d1:any,d2 : any){
    const result = this.transactionsList.filter(t => t.date>d1 && t.date<d2);
    console.log('update',result);
    //this.profit=
    this.updateRevenueAndProfit();
    this.updateDate();

    this.updateOptions = {
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.calendar
        }
      ],
      series: [{
        data1: this.revenue,
        data2: this.profit
      }]

    };
    return result;

  }





  ngOnInit(): void {
    this.getTransactions();

  }

  initStockAndSales() {

    for (let i = 1; i < 13; i++) {
      this.productsStock.push(Math.random());
    }

    for (let i = 1; i < 13; i++) {
      this.productsSold.push(Math.random());
    }

    for (let i = 1; i < 13; i++) {
      this.products.push("Produit " + i);
    }

    this.options2 = {
      legend: {
        data: ['Stock', 'Ventes'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.products,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Stock',
          type: 'bar',
          data: this.productsStock,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'Ventes',
          type: 'bar',
          data: this.productsSold,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };

  }

  

  initTotalSales() {

    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ["Chiffres d'affaires", "Bénéfices"]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.calendar
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: "Chiffres d'affaires",
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: this.revenue
        },
        {
          name: 'Bénéfices',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: this.profit
        },

      ]
    };
  }

}
