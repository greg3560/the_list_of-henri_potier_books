/*
the mission of this container is
to update the interface with the call for actions
 */

import { connect } from 'react-redux';
import DetailsBook from '../components/DetailsBook';
import {bindActionCreators} from "redux";
import * as BookActions from '../actions/RequestAPIAction';
import * as BasketActions from "../actions/BasketAction";


const mapStateToProps = (state) => {
    return {
        data: state.api.data, // response api
        basketList: state.basket.basket // list of basket
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(BookActions, dispatch),
    basket: bindActionCreators(BasketActions, dispatch),
});

export default {
    DetailsPage: connect(mapStateToProps, mapDispatchToProps)(DetailsBook),
};