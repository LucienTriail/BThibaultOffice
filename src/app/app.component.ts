import {Component} from '@angular/core';
import { NavigationStart, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BateauThibaultBackOfficeCours';



  /*constructor(public router: Router) {
  }*/

  showHead = true;

  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showHead = !(event['url'] == '/login' || event['url'] == '/error');
      }
    });
  }
  }




