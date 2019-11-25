import React from 'react';
import BookCard from './BookCard';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.actions.fetchBooks();
    };

    render() {
        return (
            <div>
                {this.props.data.map((item, index) => {
                    return <BookCard
                        key={index}
                        item={item}
                    />
                })}
            </div>
        );
    }
}

export default BookList;