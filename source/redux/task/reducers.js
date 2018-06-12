import { Map, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    isEdited: false,
});

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_EDIT_TASK:
            return state.set('isEdited', action.payload);
        case types.CHANGE_TASK_MESSAGE:
            return state.set('taskMessage', action.payload);
        default:
            return state;
    }
};
