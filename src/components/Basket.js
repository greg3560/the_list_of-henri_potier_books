import React from 'react';
import SpanningTable from './SpanningTable';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import PropTypes from "prop-types";

const styles = {
    root: {
        marginTop: '3rem'
    },
    text: {
        height: '500px'
    },
    spinner: {
        left: '50%',
        position: 'absolute'
    }
};

class BookList extends React.Component {
    constructor(props) {
        super(props);
        props.actions.fetchBooks();
        if (props.basketList.length > 0) props.offersActions.fetchOffers(props.basketList);
        this.state= { // update quantity and refresh SpanningTable
            qty: {
                nbre: 1,
                isbn: ""
            }
        };
    }

    handleUpdateQuantity = (e) => {
        let isbn = e.target.getAttribute('isbn');
        let value = e.currentTarget.value;
        this.setState({qty: {nbre: value, isbn: isbn}});
    };
    render() {
        const {classes} = this.props;
        let bookInBasket = this.props.data.filter(book => {
            return this.props.basketList.indexOf(book.isbn) !== -1;
        });
        return (
            <div>
                {this.props.dataOffers.length > 0 && this.props.basketList.length > 0 && (
                    <div>
                        <SpanningTable bookInBasket={bookInBasket} offer={this.props.dataOffers} handleUpdateQuantity={this.handleUpdateQuantity} qty={this.state.qty} />
                    </div>
                )}
                {this.props.basketList.length === 0 && (
                    <Typography variant="h5" component="h3" className={classes.text} align={'center'}>
                        Le panier est vide
                    </Typography>
                )}
            </div>
        );
    }
}

// check the props
BookList.propTypes = {
    dataOffers: PropTypes.array.isRequired,
    basketList: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    offersActions: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default withStyles(styles)(BookList);