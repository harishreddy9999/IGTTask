// reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setUsers, sortUsersByName } from './userActions';
import { User } from './userModel';

export interface UserState {
    users: User[];
    // other state variables...
  }

  export const initialState: UserState = {
    users: [],
    // other state variables...
  };
  export const userReducer = createReducer(
    initialState,

    on(setUsers, (state, { users }) => ({
      ...state,
      users: [...users], // Update the users array with the fetched data
    })),
    
    on(sortUsersByName, (state, { sortDirection }) => {
      console.log("ferferfreferfr", state.users)
      const sortedUsers = [...state.users].sort((a, b) => {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
      return {
        ...state,
        users: sortedUsers,
      };
    })
  );

  
