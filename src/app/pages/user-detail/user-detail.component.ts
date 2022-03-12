import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Users} from "../../core/interface/users";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  value:string='';


  user:Users= {
    "username":"",
    "password":""
  };

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getSingleUser().subscribe((data) =>{
      console.log('data: ',data);
      this.user = data;
    });

  }

}
