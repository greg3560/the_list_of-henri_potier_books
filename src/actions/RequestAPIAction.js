import * as types from '../constants/ActionTypes';
import * as APIConfig from '../constants/APIConfig';
import axios from "axios/index";

// actions creators

export const requestAPI = () => ({ // action for api loading
    type: types.REQUEST_API,
    loading: true,
});
export const requestAPISuccess = (data) => ({ // action for api success
    type: types.REQUEST_API_SUCCESS,
    data,
    loading: false,
});
export const requestAPIError = (error) => ({ // action for api error
    type: types.REQUEST_API_ERROR,
    loading: false,
    error,
});

/* thunk creation */

export const fetchBooks = () => {
    const options = {
        url: `${APIConfig.PROXY_URL + APIConfig.API_URI + APIConfig.END_POINT}`,
        headers: {
            'Access-Control-Allow-Origin': null,
            "x-requested-with": "xhr",
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        },
    };
    axios(options);
    return (dispatch) => {
        dispatch(requestAPI());
        return axios.get(`${APIConfig.PROXY_URL + APIConfig.API_URI + APIConfig.END_POINT}`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }

                return response.data;
            })
            .then((books) => {
                dispatch(requestAPISuccess(books));
            })
            .catch((error) => {
                console.log(error);
                dispatch(requestAPIError(error));
            });
    };
};