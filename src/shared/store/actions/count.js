import { createAction } from 'redux-actions';

export const INCREMENT = 'INCREMENT';

export const DECREMENT = 'DECREMENT';

export const SET = 'SET';

export const increment = createAction(INCREMENT);

export const decrement = createAction(DECREMENT);

export const set = createAction(SET);
