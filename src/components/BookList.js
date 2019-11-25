import React from 'react';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.props.actions.fetchBooks();
    };

    render() {
        return (
            <div>
                {console.log('this.props', this.props)}
            </div>
        );
    }
}

export default BookList;