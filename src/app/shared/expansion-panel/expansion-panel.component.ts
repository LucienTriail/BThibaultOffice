import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent implements OnInit {
@Input() promotion:boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
