import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { SaleActions } from './sale.actions';
import { HttpClient } from '@angular/common/http';
import { CreateSalePayload, Sale, SaleWithCourseAndBuyer } from '../models';
import { environment } from 'src/environments/environment';
import { BuyerService } from '../../buyers/services/buyer.service';
import { Buyer } from '../../buyers/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


@Injectable()
export class SaleEffects {

  loadSales$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(SaleActions.loadSales),


      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getSalesFromDB().pipe(

          // SI TODO SALE BIEN....
          map(data => SaleActions.loadSalesSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(SaleActions.loadSalesFailure({ error }))))
      )
    );
  });

  loadBuyerOptions$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(SaleActions.loadBuyerOptions),


      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getBuyerOptions().pipe(

          // SI TODO SALE BIEN....
          map(data => SaleActions.loadBuyerOptionsSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(SaleActions.loadBuyerOptionsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(SaleActions.loadCourseOptions),


      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCourseOptions().pipe(

          // SI TODO SALE BIEN....
          map(data => SaleActions.loadCourseOptionsSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(SaleActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });


  createSale$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(SaleActions.createSale),


      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createSale(action.payload).pipe(

          // SI TODO SALE BIEN....
          map(data => SaleActions.createSaleSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(SaleActions.createSaleFailure({ error }))))
      )
    );
  });

  createSaleSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO SaleActions.loadSales
      ofType(SaleActions.createSaleSuccess),
      map(() => this.store.dispatch(SaleActions.loadSales()))
    );
  }, { dispatch: false });


  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getSalesFromDB(): Observable<SaleWithCourseAndBuyer[]> {
    return this.httpClient.get<SaleWithCourseAndBuyer[]>(environment.baseApiUrl + '/sales?_expand=course&_expand=buyer')
  }

  private getBuyerOptions(): Observable<Buyer[]> {
    return this.httpClient.get<Buyer[]>(environment.baseApiUrl + '/buyers')
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses');
  }

  private createSale(payload: CreateSalePayload): Observable<Sale> {
    return this.httpClient.post<Sale>(environment.baseApiUrl + '/sales', payload)
  }
}