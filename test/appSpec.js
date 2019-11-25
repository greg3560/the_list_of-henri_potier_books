import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App';
import reducer from "../src/reducers";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            name: 'The list of book',
            trace: true // will include stack trace for every dispatched action,
                        // so you can see it in trace tab jumping directly
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk) // allow creator actions that will return a function.
    // this function may create a delay before dispatching an action
);

const store = createStore(reducer, enhancer);

let jsdom = require('mocha-jsdom');

jsdom({
    url: "http://localhost"
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
        <App/>
    </Provider>, div);
});