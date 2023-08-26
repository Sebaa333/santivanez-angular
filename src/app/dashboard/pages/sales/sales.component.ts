import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SaleActions } from './store/sale.actions';
import { SaleWithCourseAndBuyer } from './models';
import { selectSales } from './store/sale.selectors';
import { MatDialog } from '@angular/material/dialog';
import { SaleDialogComponent } from './components/sale-dialog/sale-dialog.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [],
})
export class SalesComponent implements OnInit {
  displayedColumns = ['id', 'courses', 'buyer', 'total'];
  sales$: Observable<SaleWithCourseAndBuyer[]>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.sales$ = this.store.select(selectSales);
  }

  onAdd(): void {
    this.matDialog.open(SaleDialogComponent);
  }

  ngOnInit(): void {
    // Dispatch the action to load sales data when the component initializes
    this.store.dispatch(SaleActions.loadSales());

    // You can also dispatch actions to load buyer and course options if needed
    // this.store.dispatch(SaleActions.loadBuyerOptions());
    // this.store.dispatch(SaleActions.loadCourseOptions());
  }
}

