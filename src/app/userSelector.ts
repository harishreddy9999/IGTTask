// selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<any>('user');

export const selectSortedUsers = createSelector(
  selectUserState,
  (state) => state.users
);
