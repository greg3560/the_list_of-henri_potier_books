import React from 'react';
import SpanningTable from './SpanningTable';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";

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

export default withStyles(styles)(BookList);