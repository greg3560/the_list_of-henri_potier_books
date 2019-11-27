import * as type from '../constants/ActionTypes';

// we connect the global state with the actions

// initial global state
const initialState = {
    loadingOffers: null,
    dataOffers: [],
    errorOffers: null
};

const offersApi = (state = initialState, action) => {
    switch (action.type) {
        case type.REQUEST_API_OFFERS:
            return { // update global state
                ...state,
                loadingOffers: action.loadingOffers,
            };
        case type.REQUEST_API_OFFERS_SUCCESS:
            return { // update global state
                ...state,
                loadingOffers: action.loadingOffers,
                dataOffers: action.dataOffers,
            };
        case type.REQUEST_API_OFFERS_ERROR:
            return { // update global state
                ...state,
                loadingOffers: action.loadingOffers,
                errorOffers: action.errorOffers,
            };
        default:
            return state
    }
};

export default offersApi;