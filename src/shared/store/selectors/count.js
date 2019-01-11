import { createSelector } from 'reselect';

export const countModule = state => state.count;

export const countSelector = createSelector(countModule, m => m.count);

export const doubleCountSelector = createSelector(countSelector, c => 2 * c);
