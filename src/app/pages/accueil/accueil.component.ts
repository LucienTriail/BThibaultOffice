import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";


export interface ExampleTab {
  graph: object;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  options: any;
  options2: any;
  updateOptions: any;
  updateOptions2: any;
  revenue: number[] = [];
  profit: number[] = [];
  products: string[] = [];
  productsSold: number[] = [];
  productsStock: number[] = [];

  //TODO: creer la méthode de filtrage du tableau contenant la table des transactions
  //TODO: insérer un DatePicker et ecouter ses changements. Call la méthode de filtrage avec les nouvelles dates
  // a chaque changement

  constructor(private api: ApiService) {
  }


  ngOnInit(): void {
    this.initTotalSales();


    this.updateOptions = {
      series: [{
        data1: this.revenue,
        data2: this.profit
      }]

    };


  }

  initStockAndSales() {

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
    for (let i = 1; i < 13; i++) {
      this.revenue.push(Math.random());
    }

    for (let i = 1; i < 13; i++) {
      this.profit.push(Math.random());
    }

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
          data: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
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
