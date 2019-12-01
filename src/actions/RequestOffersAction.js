import * as types from '../constants/ActionTypes';
import * as APIConfig from '../constants/APIConfig';
import axios from "axios/index";

// actions creators

export const requestAPIOffers = () => ({ // action for api loading
    type: types.REQUEST_API_OFFERS,
    loadingOffers: true,
});
export const requestAPIOffersSuccess = (dataOffers) => ({ // action for api success
    type: types.REQUEST_API_OFFERS_SUCCESS,
    dataOffers,
    loadingOffers: false,
});
export const requestAPIOffersError = (errorOffers) => ({ // action for api error
    type: types.REQUEST_API_OFFERS_ERROR,
    loadingOffers: false,
    errorOffers,
});

/* thunk creation */

export const fetchOffers = (basket) => {
    const queryBasket = basket.toString();
    const options = {
        url: `${APIConfig.PROXY_URL + APIConfig.API_URI + '/' + queryBasket + APIConfig.END_POINT_OFFERS}`,
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
        dispatch(requestAPIOffers());
        return axios.get(`${APIConfig.PROXY_URL + APIConfig.API_URI + '/' + queryBasket + APIConfig.END_POINT_OFFERS}`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.data.offers;
            })
            .then((dataOffers) => {
                dispatch(requestAPIOffersSuccess(dataOffers));
            })
            .catch((error) => {
                console.log('errorApiOffers', error);
                dispatch(requestAPIOffersError(error));
            });
    };
};