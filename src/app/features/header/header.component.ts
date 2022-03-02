import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
active:number=1;
  constructor(private router:Router ) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate((['/home']));
  }

  goToDetails(){
    this.router.navigate(['/details']);
  }
}
