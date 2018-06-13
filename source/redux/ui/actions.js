import { types } from './types';

export const uiActions = Object.freeze({
    dataIsLoading: (state) => ({
        type:    types.DATA_IS_LOADING,
        payload: state,
    }),
    searchTask: (searchString) => ({
        type:    types.SEARCH_TASK,
        payload: searchString,
    }),
});
