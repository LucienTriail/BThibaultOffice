import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Users} from "../../core/interface/users";


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
  options2 : any;
  updateOptions:any;
  updateOptions2:any;



  constructor(private api:ApiService) {
  }


  ngOnInit(): void {
    const revenue :number[] = [];
    const profit :number[] = [];

    const products : string[] = [];
    const productsSold :number[] = [];
    const productsStock :number[] = [];


    for(let i=1; i<13;i++){
      revenue.push(Math.random());
    }

    for(let i=1; i<13;i++){
      profit.push(Math.random());
    }

    this.updateOptions = {
      series: [{
        data1: revenue,
        data2:profit
      }]

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
          data: revenue
        },
        {
          name: 'Bénéfices',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: profit
        },

      ]
    };

    this.options2 = {
      legend: {
        data: ['Stock', 'Ventes'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: products,
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
          data: productsStock,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'Ventes',
          type: 'bar',
          data: productsSold,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };


  }

}
