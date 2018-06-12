import { Map, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    dataIsLoading: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DATA_IS_LOADING:
            return state.set('dataIsLoading', action.payload);
        default:
            return state;
    }
};
