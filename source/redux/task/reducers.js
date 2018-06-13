import { Map, List, fromJS } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    isEdited:    false,
    taskMessage: Map({
        id:      '',
        message: '',
    }),
});

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_EDIT_TASK:
            return state.set('isEdited', action.payload);
        case types.CHANGE_TASK_MESSAGE:
            return state.set('taskMessage', fromJS(action.payload));
        default:
            return state;
    }
};
