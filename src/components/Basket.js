import React from 'react';
import SpanningTable from './SpanningTable';
import BookCard from "./BookCard";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        props.actions.fetchBooks();
    }

    render() {
        let results = [...this.props.data].filter(book => {
            return this.props.basketList.indexOf(book.isbn) !== -1;
        });
        return (
            <div>
                <SpanningTable items={results} />
            </div>
        );
    }
}

export default BookList;