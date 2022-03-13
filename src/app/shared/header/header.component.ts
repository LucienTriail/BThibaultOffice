import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
active:number=1;
//TODO: ajouter la méthode getCategory
categories = ['Poissons', 'Crustacés'];
  constructor(private router:Router ) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate((['/home']));
  }

  goToDetails(){
    this.router.navigate(['/details']);
  }

  goToStockManage(){
    this.router.navigate(['/stock']);
  }
}
