import * as type from '../constants/ActionTypes';

// we connect the global state with the actions

// initial global state
const initialState = {
    loading: null,
    data: [],
    error: null
};

const api = (state = initialState, action) => {
    switch (action.type) {
        case type.REQUEST_API:
            return { // update global state
                ...state,
                loading: action.loading,
            };
        case type.REQUEST_API_SUCCESS:
            return { // update global state
                ...state,
                loading: action.loading,
                data: action.data,
            };
        case type.REQUEST_API_ERROR:
            return { // update global state
                ...state,
                loading: action.loading,
                error: action.error,
            };
        default:
            return state
    }
};

export default api;