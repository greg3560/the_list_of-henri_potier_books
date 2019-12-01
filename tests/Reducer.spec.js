import * as type from '../src/constants/ActionTypes';
let chai = require('chai');
let expect = chai.expect;
import api from '../src/reducers/api';

const initialState = {
    loading: null,
    data: [],
    error: null
};

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

describe('api reducer', () => {
    it('should handle REQUEST API', () => {
        expect(api(initialState, {
            type: type.REQUEST_API,
            loading: true,
        })).to.eql({
            ...initialState,
            loading: true,
        });
    });
    it('should handle REQUEST API_SUCCESS', () => {
        expect(api(initialState, {
            type: type.REQUEST_API_SUCCESS,
            data,
            loading: false,
        })).to.eql({
            ...initialState,
            loading: false,
            data: data
        });
    });
    it('should handle REQUEST API_ERROR', () => {
        expect(api(initialState, {
            type: type.REQUEST_API_ERROR,
            loading: false,
            error: dataError,
        })).to.eql({
            ...initialState,
            loading: false,
            error: dataError,
        });
    });
});