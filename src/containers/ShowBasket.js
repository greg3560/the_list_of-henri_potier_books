/*
the mission of this container is
to update the interface with the call for actions
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BookActions from '../actions/RequestAPIAction';
import * as offersActions from '../actions/RequestOffersAction';
import Basket from '../components/Basket';


const mapStateToProps = (state) => {
    return {
        data: state.api.data, // response api
        dataOffers: state.offersApi.dataOffers, // response api
        basketList: state.basket.basket // list of basket
    };
};

// link component with actions and dispatch

/*
    connection to the redux store.
    update UI with dispatch action
 */

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(BookActions, dispatch),
    offersActions: bindActionCreators(offersActions, dispatch),
});

export default {
    Basket: connect(mapStateToProps, mapDispatchToProps)(Basket),
};