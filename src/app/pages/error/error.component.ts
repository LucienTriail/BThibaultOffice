import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
status:number = 0;

  constructor(private router : Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {

      // @ts-ignore
      if(this.router.getCurrentNavigation().extras.state){

        // @ts-ignore
        this.status = this.router.getCurrentNavigation().extras.state.status;

      }


    });
  }

  ngOnInit(): void {
  }

}
