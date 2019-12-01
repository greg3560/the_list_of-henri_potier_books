import React from 'react';
import BookCard from './BookCard';
import BallSpinner from "../icon/BallSpinner";
import Grid from '@material-ui/core/Grid';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.actions.fetchBooks();
    };

    handleClickBasket = (e, basketChecked) => { // toggle add/delete item
        let isbn = e.currentTarget.getAttribute("isbn");
        if (basketChecked) this.props.basket.deleteBasket(isbn);
        else this.props.basket.addBasket(isbn);
    };

    render() {
        return (
            <Grid container spacing={5} direction={'row'} justify={'space-between'} alignItems={'stretch'}>
                {this.props.data.length > 0 && this.props.data.map((book, index) => {
                    return <BookCard
                        key={index}
                        book={book}
                        handleClickBasket={this.handleClickBasket}
                        basketList={this.props.basketList}
                    />;
                })}
                {/*{this.props.data.length === 0 && <BallSpinner/>}*/}
            </Grid>
        );
    }
}

export default BookList;