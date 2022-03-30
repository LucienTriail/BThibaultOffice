import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Users} from "../../core/interface/users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Users = {
    "username": "",
    "password": "",
  };

  constructor(private api: ApiService, private router: Router) {
  }

  authenticate() {
    this.api.login(this.user).subscribe(
      (data) => {
        console.log('data: ', data);
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        this.router.navigate(['/accueil']);
      });

  }

  ngOnInit(): void {
  }

}
