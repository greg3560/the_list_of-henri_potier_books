import React from 'react';
import SpanningTable from './SpanningTable';
import BookCard from "./BookCard";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        props.actions.fetchBooks();
        props.offersActions.fetchOffers(props.basketList);

    }

    render() {
        let bookInBasket = this.props.data.filter(book => {
            return this.props.basketList.indexOf(book.isbn) !== -1;
        });
        return (
            <div>
                <SpanningTable bookInBasket={bookInBasket} offer={this.props.dataOffers} />
            </div>
        );
    }
}

export default BookList;