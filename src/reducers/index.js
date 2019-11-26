import { combineReducers } from 'redux'

import api from './api'
import basket from './basket'

const rootReducer = combineReducers({
    api,
    basket
});

export default rootReducer;