import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions/RequestAPIAction';
import * as actionsBasket from '../src/actions/BasketAction';

let data = [
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
];
let dataError = [
    {
        "error": 'error'
    }
];

describe('api actions', () => {
    it('should return action REQUEST_API', () => {
        expect(actions.requestAPI()).to.eql({
            type: types.REQUEST_API,
            loading: true,
        })
    });

    it('should return action REQUEST_API_SUCCESS', () => {
        expect(actions.requestAPISuccess(data)).to.eql({
            type: types.REQUEST_API_SUCCESS,
            data: data,
            loading: false,
        })
    });

    it('should return action REQUEST_API_ERROR', () => {
        expect(actions.requestAPIError(dataError)).to.eql({
            type: types.REQUEST_API_ERROR,
            error: dataError,
            loading: false,
        })
    });
});


describe('basket actions', () => {
    let isbn = "a460afed-e5e7-4e39-a39d-c885c05db861";
        it('should return action ADD_BASKET', () => {
            expect(actionsBasket.addBasket(isbn)).to.eql({
                type: types.ADD_BASKET,
                basket: isbn,
            })
        });

    it('should return action DELETE_BASKET', () => {
        expect(actionsBasket.deleteBasket(isbn)).to.eql({
            type: types.DELETE_BASKET,
            basket: isbn,
        })
    });
});