import { Map, List, fromJS } from 'immutable';

// Instruments
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.DELETE_TASK:
            return fromJS(state.filter((task) => task.get('id') !== action.payload));
        case types.EDIT_TASK:
            return fromJS(state.map((task) => {
                if (task.get('id') === action.payload.id) {
                    const editedTask = fromJS(action.payload);

                    return editedTask;
                }

                return task;
            }));
        case types.GET_ALL_TASKS:
            return fromJS(action.payload);
        default:
            return state;
    }
};
