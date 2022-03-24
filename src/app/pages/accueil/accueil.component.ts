import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Transactions} from 'src/app/core/interface/transaction';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";


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

  options: any;
  revenue: number[] = [];
  profit: number[] = [];
  transactionsList: Transactions[] = [];
  calendar: string[] = [];
  filteredDate: Transactions[] = [];
  filteredByCategory: Transactions[] = [];
  categories: string[] = ['poissons', 'crustacés'];
  isDateSelected: boolean = false;
  currentYear: string = new Date().getUTCFullYear().toString();
  initialStartDate: string = "1/1/" + this.currentYear;
  initialEndDate: string = "12/31/" + this.currentYear;
  yearlyProfit: number = 0;
  previousYearTransactions: Transactions[] = [];


  constructor(private api: ApiService, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getTransactions();
  }


  openSnackBar() {

    let numb = this.updatePreviousYearProfit();
    if (this.yearlyProfit > numb) {
      this.snack.open('Bravo, vos bénéfices sont exceptionnels!', 'Fermer', {panelClass: 'snackbarSuccess'});
    } else {
      this.snack.open("Faites attentions, profits dans le rouge!", 'Close', {panelClass: 'snackBarNotGood'})
    }
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.isDateSelected = true;
    console.log(' daterangechange', dateRangeStart.value);
    console.log('type daterangechange', typeof dateRangeEnd.value);
    this.filteredDate = this.filterDate(dateRangeStart.value, dateRangeEnd.value);
    this.sortByDate(this.filteredDate);
    // for (let i = 0; i < this.filteredDate.length; i++) console.log('in date change', this.filteredDate[i]);
    this.updateRevenueAndProfit(this.filteredDate);
    this.calendar = [];
    this.calendar = this.updateDate(this.filteredDate);
    this.setOptions(this.calendar, this.revenue, this.profit);

  }

  getTransactions() {
    this.api.getTransactions().subscribe((data) => {
      this.transactionsList = data;
      console.log('putin ', data)
      this.previousYearTransactions = [...this.transactionsList]
      this.updateRevenueAndProfit(this.transactionsList);
      this.previousYearTransactions = this.filterDateParam(this.previousYearTransactions);
      // console.log('PARRAMMM ', this.previousYearTransactions[0]);
      // console.log('PARAMMMM STRIIINIGYYYY, ', JSON.stringify(this.previousYearTransactions[0]));

      // console.log('before filter date, transactionlist ', this.transactionsList)

      this.transactionsList = this.filterDate(this.initialStartDate, this.initialEndDate);

      // console.log('after filter date, transactionlist ', this.transactionsList)

      this.sortByDate(this.transactionsList);
      this.calendar = this.updateDate(this.transactionsList);
      console.log("initialisation", this.profit);
      this.setOptions(this.calendar, this.revenue, this.profit);
      this.openSnackBar();

    });

  }

  selectMe(event: any) {
    this.filteredByCategory = [];
    console.log('event ', event);
    console.log('filteredate in cat: ', this.filteredDate)
    this.filteredByCategory = [...this.filteredDate];
    console.log('spreaded filterCAT: ', this.filteredByCategory);
    this.filteredByCategory = this.filterByCategory(event);
    console.log('filter by cat: ', this.filteredByCategory);
    this.updateRevenueAndProfit(this.filteredByCategory);
    this.setOptions(this.calendar, this.revenue, this.profit);
  }


  filterByCategory(cat: string): Transactions[] {

    return this.filteredDate.filter(item => {
      console.log('item cat: ', item);
      return item.category == cat;
    });
  }


  filterDate(dateStart: string, dateEnd: string) {
    let startDate = new Date(dateStart);
    let endDate = new Date(dateEnd);

    return this.transactionsList.filter(item => {
      let date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });

  }

  filterDateParam(array: Transactions[]) {
    let previousYear = new Date().getUTCFullYear() - 1;
    let startDateString = "1/1/" + previousYear.toString();
    let endDateString = "12/31/" + previousYear.toString();
    let startDate = new Date(startDateString);
    let endDate = new Date(endDateString);


    return array.filter(item => {
      let date = new Date(item.date);

      return date >= startDate && date <= endDate;
    });

  }

  sortByDate(array: Transactions[]) {
    array.sort(function compare(a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

  }


  updateRevenueAndProfit(array: Transactions[]) {

    this.revenue = [];
    for (let i = 0; i < array.length; i++) {
      this.revenue[i] = array[i].amount;
      //  console.log('revenue ', this.revenue[i]);
    }
    //console.log('revenue in updaterevenye ', this.revenue)
    this.profit = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].operation == 'Vente') {
        let temp = (this.revenue[i] * 0.3);
        this.profit[i] = this.revenue[i] - temp;
        this.yearlyProfit += this.profit[i];
        // console.log("yearly profit " + this.yearlyProfit);
      }
    }

  }

  updatePreviousYearProfit(): number {
    let previousYearProfit: number = 0;

    for (let i = 0; i < this.previousYearTransactions.length; i++) {
      previousYearProfit += this.previousYearTransactions[i].amount;
      // console.log('PREVVIOUS MONIIEEEE', previousYearProfit);
    }

    return previousYearProfit;
  }


  updateDate(array: Transactions[]): string[] {
    let calendar: string[] = [];

    for (let i = 0; i < array.length; i++) {
      let date: Date = new Date(array[i].date);
      console.log('date', typeof date);

      let day: number = date.getDate();
      let mois: number = date.getUTCMonth() + 1;
      let year: number = date.getUTCFullYear();
      calendar[i] = day + "-" + mois + "-" + year;
    }
    return calendar;
  }

  setOptions(calendar: string[], revenue: number[], profit: number[]) {
    console.log("setoption", profit);

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
          data: calendar
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


}
