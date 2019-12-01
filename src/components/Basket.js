import React from 'react';
import SpanningTable from './SpanningTable';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        props.actions.fetchBooks();
        if (props.basketList.length > 0) props.offersActions.fetchOffers(props.basketList);
    }

    render() {
        let bookInBasket = this.props.data.filter(book => {
            return this.props.basketList.indexOf(book.isbn) !== -1;
        });
        return (
            <div>
                {this.props.dataOffers.length > 0 && (
                    <div>
                        <SpanningTable bookInBasket={bookInBasket} offer={this.props.dataOffers} />
                    </div>
                )}
            </div>
        );
    }
}

export default BookList;