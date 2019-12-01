/*
the mission of this container is
to update the interface with the call for actions
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookActions from '../actions/RequestAPIAction';
import * as BasketActions from '../actions/BasketAction';
import SearchAppBar from '../components/SearchAppBar';
import BookList from '../components/BookList';

// apply the action to the UI

const mapStateToProps = (state) => {
    return {
        data: state.api.data, // response api
        basketList: state.basket.basket // list of basket
    }
};

// link component with actions and dispatch
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(BookActions, dispatch),
    basket: bindActionCreators(BasketActions, dispatch),
});
/*
    connection to the redux store.
    update UI with dispatch action
 */

export default {
    BookList: connect(mapStateToProps, mapDispatchToProps)(BookList),
    SearchAppBar: connect(mapStateToProps, mapDispatchToProps)(SearchAppBar),
}