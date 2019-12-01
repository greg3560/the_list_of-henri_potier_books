import React from 'react';
import App from '../src/App';
import ShowBooks from '../src/containers/ShowBooks';
import ShowBasket from '../src/containers/ShowBasket';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
let store, wrapper;

const initialState = {
    api: {
        loading: null,
        data: [],
        error: null
    },
    basket: {
        basket: []
    },
    offersApi: {
        loadingOffers: null,
        dataOffers: [],
        errorOffers: null
    }
};

describe('Components', () => {
    beforeEach(() => {
        store = mockStore(initialState);

    });
    it('+++ render the connected(SMART) component', () => {
        wrapper = shallow(<Provider store={store}><App/></Provider>);
        expect(wrapper.length).equal(1);
    });

    it('render the SearchAppBar component', (done) => {
        wrapper = shallow(<ShowBooks.SearchAppBar store={store}/>);
        expect(wrapper.length).equal(1);
        done();
    });
    it('render the BookList component', () => {
        wrapper = shallow(<ShowBooks.BookList store={store}/>);
        expect(wrapper.length).equal(1);
    });
    it('render the Basket component', () => {
        wrapper = shallow(<ShowBasket.Basket store={store}/>);
        expect(wrapper.length).equal(1);
    });
});