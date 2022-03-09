import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSingleProductComponent } from './dialog-single-product.component';

describe('DialogSingleProductComponent', () => {
  let component: DialogSingleProductComponent;
  let fixture: ComponentFixture<DialogSingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSingleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
