import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from "../../core/services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active: number = 1;
//TODO: ajouter la méthode getCategory
  categories = ['Poissons', 'Crustacés'];

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate((['/accueil']));
  }

  goToDetails() {
    this.router.navigate(['/details']);
  }

  goToStock() {
    this.router.navigate(['/stock']);

  }

  logout() {
    this.api.logout().subscribe(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      this.router.navigate(['/login']);

    })
  }
}
