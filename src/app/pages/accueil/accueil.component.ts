import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from 'rxjs';

export interface ExampleTab {
  graph: object;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  
  ngOnInit(): void {

    // const xAxisData = ['janvier','fevrier'];
    // const chiffreaffaire = [100,200];
    // const profit = [80,80];

    // // for (let i = 0; i < 100; i++) {
    // //   xAxisData.push('category' + i);
    // //   data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    // //   data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    // // }

    // this.options = {
    //   legend: {
    //     data: ['bar', 'bar2'],
    //     align: 'left',
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: xAxisData,
    //     silent: false,
    //     splitLine: {
    //       show: false,
    //     },
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: 'bar',
    //       type: 'bar',
    //       data: chiffreaffaire,
    //       animationDelay: (idx: number) => idx * 10,
    //     },
    //     {
    //       name: 'bar2',
    //       type: 'bar',
    //       data: profit,
    //       animationDelay: (idx: number) => idx * 10 + 100,
    //     },
    //   ],
    //   animationEasing: 'elasticOut',
    //   animationDelayUpdate: (idx: number) => idx * 5,
    // };
  }
  // options: any;
  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {graph : this.options},
          {graph : this.options}
          
        ]);
      }, 1000);
    });
  }
 
    // const xAxisData = ['janvier','fevrier'];
    // const chiffreaffaire = [100,200];
    // const profit = [80,80];

      options:any = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: ['janvier','fevrier'],
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: [100,200],
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: [80,80],
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  

  

}
