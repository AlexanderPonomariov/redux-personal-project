import { Map } from 'immutable';

// Instruments
import { types } from './types';

const initialState = Map({
    dataIsLoading: false,
    searchTaskStr: '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DATA_IS_LOADING:
            return state.set('dataIsLoading', action.payload);
        case types.SEARCH_TASK:
            return state.set('searchTaskStr', action.payload);
        default:
            return state;
    }
};
