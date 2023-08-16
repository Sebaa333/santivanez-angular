import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterFeatureKey, CounterState } from './counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>(counterFeatureKey)
export const selectCounterStateValue = createSelector(
    selectCounterState,
    (state)=>state.value,
    )