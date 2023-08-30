import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SaleActions } from '../../store/sale.actions';
import { Buyer } from '../../../buyers/models';
import { selectBuyerOptions, selectCourseOptions } from '../../store/sale.selectors';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sale-dialog',
  templateUrl: './sale-dialog.component.html',
  styles: [
  ]
})
export class SaleDialogComponent implements OnInit {

  courseIdControl = new FormControl(null, Validators.required);
  buyerIdControl = new FormControl(null, Validators.required);

  saleForm = new FormGroup({
    courseId: this.courseIdControl,
    buyerId: this.buyerIdControl,
  });

  buyerOptions$: Observable<Buyer[]>;
  courseOptions$: Observable<Course[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<SaleDialogComponent>) {
    this.buyerOptions$ = this.store.select(selectBuyerOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(SaleActions.loadCourseOptions());
    this.store.dispatch(SaleActions.loadBuyerOptions());
  }

  onSubmit(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
    } else {
      this.store.dispatch(SaleActions.createSale({ payload: this.saleForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}