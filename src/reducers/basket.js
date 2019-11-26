import * as type from '../constants/ActionTypes';

// we connect the global state with the actions

// initial global state
const initialState = {
    basket: [],
};

const basket = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_BASKET:
            return { // update global state
                basket: [...state.basket, action.basket],
            };
        case type.DELETE_BASKET:
            let index = state.basket.indexOf(action.basket);
            state.basket.splice(index, 1);
            return { // update global state
                basket: state.basket,
            };
        default:
            return state
    }
};

export default basket;