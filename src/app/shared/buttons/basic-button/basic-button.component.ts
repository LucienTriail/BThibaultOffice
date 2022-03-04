import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.css']
})
export class BasicButtonComponent implements OnInit {
@Input() role: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
