import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions/RequestAPIAction';
let chai = require('chai');
let chaiHttp = require('chai-http');

let expect = chai.expect;

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