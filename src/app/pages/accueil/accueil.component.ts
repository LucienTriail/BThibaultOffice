import { Component, OnInit , OnDestroy } from '@angular/core';


export interface ExampleTab {
  graph: object;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  revenue :number[] = [];
   profit:number[] = []
  options:any;
  updateOptions: any;

  //TODO: faire call API au lieu des randomData...
randomData(){
  for (let i=0;i<12;i++){
    let truc = Math.random();
    this.profit.push(truc)
  }

  for (let j=0;j<12;j++){
    let truc = Math.random();
    this.revenue.push(truc)
  }
}


  constructor() {}

  ngOnInit(): void {
  this.randomData();
    /*const xAxisData = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"];
    const data1 = [100];
    const data2 = [100];

    this.options = {
      legend: {
        data: ["chiffre d'affaires", 'benefices'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: "chiffre d'affaires",
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'benefices',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
    this.options2 = {
      legend: {
        data: ['en stock', 'vendus'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'en stock',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'vendus',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
*/




      this.updateOptions = {
        series: [{
          data: this.revenue,
          data2:this.profit
        }]
      };


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
        data: ["Chiffre d'affaire", "Bénéfices"]
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
          data: ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: "Chiffre d'affaire",
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

        }


      ]
    };


  }





}

