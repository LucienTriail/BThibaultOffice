import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Products} from "../../core/interface/products";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrls: ['./single-product-card.component.css']
})
export class SingleProductCardComponent implements OnInit {
  @Input() promotion:boolean = true;
  value:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Products) { }

  ngOnInit(): void {
  }
  priceFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  percentageDiscountFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  quantityFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  lengthFormControl = new FormControl('', Validators.maxLength(255));



  matcher = new MyErrorStateMatcher();



}
/*
<input matInput [(ngModel)]="value" type="text" [formControl]="priceFormControl" [errorStateMatcher]="matcher" >
       <button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
         <mat-icon>close</mat-icon>
       </button>
       <mat-error *ngIf="priceFormControl.hasError('pattern')">
         Entrez uniquement des chiffres positifs
       </mat-error>

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
 import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

priceFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
    percentageDiscountFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
    quantityFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
   lengthFormControl = new FormControl('', Validators.maxLength(255));

   matcher = new MyErrorStateMatcher();

 */
