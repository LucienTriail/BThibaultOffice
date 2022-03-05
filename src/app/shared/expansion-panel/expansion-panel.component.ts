import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent implements OnInit {
@Input() promotion:boolean = true;
  value:string='';

  constructor() { }

  ngOnInit(): void {
  }

  priceFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
   percentageDiscountFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
   quantityFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  lengthFormControl = new FormControl('', Validators.maxLength(255));

  matcher = new MyErrorStateMatcher();

}
