import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateSalePayload, Sale, SaleWithCourseAndBuyer } from '../models';
import { Course } from '../../courses/models';
import { Buyer } from '../../buyers/models';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    'Load Sales': emptyProps(),
    'Load Sales Success': props<{ data: SaleWithCourseAndBuyer[] }>(),
    'Load Sales Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Buyer Options': emptyProps(),
    'Load Buyer Options Success': props<{ data: Buyer[] }>(),
    'Load Buyer Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Sale': props<{ payload: CreateSalePayload }>(),
    'Create Sale Success': props<{ data: Sale }>(),
    'Create Sale Failure': props<{ error: HttpErrorResponse }>(),
  }
});
