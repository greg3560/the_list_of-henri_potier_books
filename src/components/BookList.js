import React from 'react';
import BookCard from './BookCard';

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
            <div>
                {this.props.data.map((book, index) => {
                    return <BookCard
                        key={index}
                        book={book}
                        handleClickBasket={this.handleClickBasket}
                        basketList={this.props.basketList}
                    />
                })}
            </div>
        );
    }
}

export default BookList;