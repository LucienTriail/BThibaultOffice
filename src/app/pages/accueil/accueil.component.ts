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
  // events: string[] = [];

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${type}: ${event.value}`);
  // }
  options: any;
  options2 : any;
  revenue: number[] = [];
  profit: number[] = [];
  products: string[] = [];
  productsSold: number[] = [];
  productsStock: number[] = [];
  transactionsList: Transactions[] = [];
 calendar:string[]=[];


  constructor(private api:ApiService) {

  }

  ngOnInit(): void {
    this.getTransactions();


  }
  
  // @ts-ignore 
  transactionsList:Transactions[];
  getTransactions(){
    this.api.getTransactions().subscribe((data) => {
      this.transactionsList=data;
      for(let i=0;i<this.transactionsList.length;i++)console.log('in get transactions',this.transactionsList[i].amount);
      this.updateRevenueAndProfit(this.transactionsList);
      this.sortByDate(this.transactionsList);
      this.calendar=this.updateDate(this.transactionsList);
      console.log("initialisation",this.profit);
      this.setOptions(this.calendar,this.revenue,this.profit);
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

 setOptions(calendar:string[],revenue:number[],profit:number[]){
   console.log("setoption",profit);

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
        data:calendar
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
        areaStyle: {},
        data: revenue
      },
      {
        name: 'Bénéfices',
        type: 'line',
        areaStyle: {},
        data: profit
      },

    ]
  };


 }
 
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log('type daterangechange',typeof dateRangeStart.value);
    console.log('type daterangechange',typeof dateRangeEnd.value);
   let filteredDate = this.filterDate(dateRangeStart.value,dateRangeEnd.value);
    this.sortByDate(filteredDate);
   for(let i=0;i<filteredDate.length;i++)console.log('in date change',filteredDate[i]);
     this.updateRevenueAndProfit(filteredDate);
     this.calendar=[];
     this.calendar=this.updateDate(filteredDate);
    this.setOptions(this.calendar,this.revenue,this.profit);

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

updateRevenueAndProfit(array: Transactions[]){
   
this.revenue=[];
    for(let i=0;i<array.length;i++){
      this.revenue[i]=array[i].amount;
      console.log('revenue ',this.revenue[i]);
    }
console.log('revenue in updaterevenye ',this.revenue)
this.profit=[];

    for(let i =0;i<array.length;i++){
      let temp=(this.revenue[i]*0.3);
      this.profit[i]=this.revenue[i]-temp;
      console.log("profit "+this.profit[i]);
    }
  
  }

  updateDate(array:Transactions[]): string[]{
    let calendar:string[]=[];

    for(let i=0;i<array.length;i++){
      let date :Date=new Date(array[i].date);
      console.log('date',typeof date);

      let day:number=date.getDate();
      let mois:number=date.getUTCMonth()+1;
      let year:number=date.getUTCFullYear();
      calendar[i]=day+"-"+mois+"-"+year;
    }
    return calendar;
  }
  

 

  

 

}
