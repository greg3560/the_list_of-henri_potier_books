import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {createBrowserHistory} from "history";
import {BrowserRouter as Router} from "react-router-dom";
import {CookiesProvider} from 'react-cookie';

const history = createBrowserHistory();


/* Redux DevTools Extension */
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

// creation of the store redux
const store = createStore(reducer, enhancer);


// display of the React element or its update
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </Router>
    </Provider>,
    document.getElementById('root'),
);