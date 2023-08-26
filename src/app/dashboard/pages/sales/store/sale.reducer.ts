import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { SaleWithCourseAndBuyer } from '../models';
import { Buyer } from '../../buyers/models';
import { Course } from '../../courses/models';

export const saleFeatureKey = 'sale';

export interface State {
  data: SaleWithCourseAndBuyer[];
  buyerOptions: Buyer[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  buyerOptions: [],
  courseOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,


  // load sales
  on(SaleActions.loadSales, state => {
    return {
      ...state,
      loading: true
    }
  }),


  on(SaleActions.loadSalesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: true
    }
  }),


  on(SaleActions.loadSalesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),


  // load buyer options

  on(SaleActions.loadBuyerOptions, (state) => state),
  on(SaleActions.loadBuyerOptionsSuccess, (state, action) => {
    return {
      ...state,
      buyerOptions: action.data,
    }
  }),

  
  on(SaleActions.loadCourseOptions, (state) => state),
  on(SaleActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data,
    }
  })

);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});