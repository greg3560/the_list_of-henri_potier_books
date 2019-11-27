import { combineReducers } from 'redux';
import api from './api';
import basket from './basket';
import offersApi from './offersApi';

const rootReducer = combineReducers({
    api,
    basket,
    offersApi
});

export default rootReducer;