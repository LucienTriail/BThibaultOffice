import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() isLoginPage:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
