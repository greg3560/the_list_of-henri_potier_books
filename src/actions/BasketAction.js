import * as types from '../constants/ActionTypes';

// actions creators

export const addBasket = (isbn) => ({ // action for add item to basket
    type: types.ADD_BASKET,
    basket: isbn,
});
export const deleteBasket = (isbn) => ({ // action for delete item from basket
    type: types.DELETE_BASKET,
    basket: isbn,
});