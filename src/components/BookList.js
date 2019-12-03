import React from 'react';
import BookCard from './BookCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = {
    root: {
        marginBottom: '2rem'
    },
    spinner: {
        left: '50%',
        position: 'absolute'
    }
};

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.actions.fetchBooks();
    }

    handleClickBasket = (e, basketChecked) => { // toggle add/delete item
        let isbn = e.currentTarget.getAttribute("isbn");
        if (basketChecked) this.props.basket.deleteBasket(isbn);
        else this.props.basket.addBasket(isbn);
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid
                container
                spacing={5}
                direction={'row'}
                justify={'space-between'}
                alignItems={'stretch'}
                className={classes.root}
            >
                {this.props.data.length > 0 && this.props.data.map((book, index) => {
                    return <BookCard
                        key={index}
                        book={book}
                        handleClickBasket={this.handleClickBasket}
                        basketList={this.props.basketList}
                    />;
                })}
                {this.props.data.length === 0 && <CircularProgress className={classes.spinner} color="secondary" />}
            </Grid>
        );
    }
}

BookList.propTypes = {
    classes: PropTypes.object.isRequired,
    basket: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    handleClickBasket: PropTypes.func,
    data: PropTypes.array.isRequired,
    basketList: PropTypes.array.isRequired,
};

export default withStyles(styles)(BookList);