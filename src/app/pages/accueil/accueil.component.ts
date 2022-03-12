import { Component, OnInit } from '@angular/core';


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

  constructor() {}

  ngOnInit(): void {
    const revenue :number[] = [];
    const profit :number[] = [];

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
          areaStyle: { normal: {} },
          data: revenue
        },
        {
          name: 'Bénéfices',
          type: 'line',
          stack: 'counts',
          areaStyle: { normal: {} },
          data: profit
        },

      ]
    };



  }

}
