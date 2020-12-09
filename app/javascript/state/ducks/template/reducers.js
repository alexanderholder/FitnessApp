// import { isSameDay } from 'date-fns';

import { initialState } from '../../store';

import types from './types';

const template = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    // case types.CLEAR: {
    //   return initialState.workouts;
    // }
    // case types.ADD_WORKOUT: {
    //   return [...state, payload];
    // }
    // case types.REMOVE_WORKOUT: {
    //   const indexToDelete = state.findIndex((el) => el.id === payload);
    //   return [
    //     ...state.slice(0, indexToDelete),
    //     ...state.slice(indexToDelete + 1),
    //   ];
    // }
    // case types.REMOVE_ALL_WORKOUTS: {
    //   return [...state.filter((workout) => !isSameDay(workout.date, payload))];
    // }
    default:
      return state;
  }
};

export default template;