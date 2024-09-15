// actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './userModel';

export const sortUsersByName = createAction(
  '[User] Sort Users By Name',
  props<{ sortDirection: 'asc' | 'desc' }>()
);


export const setUsers = createAction(
  '[User Lobby] Set Users',
  props<{ users: User[] }>()
);
