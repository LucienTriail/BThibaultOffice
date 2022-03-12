import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Users} from "../../core/interface/users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:Users = {
  "username": "",
  "password":"",
};

  constructor(private api:ApiService, private router:Router) { }

  authenticate(){
    console.log('in authenticate');
    console.log('in authenticate user: ', this.user);
    this.api.login(this.user).subscribe(
      (data) => {
        console.log('data: ',data);
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        this.router.navigate(['/accueil']);
      });

  }

  ngOnInit(): void {
  }

}
