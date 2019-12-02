import React from 'react';
import SpanningTable from './SpanningTable';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        props.actions.fetchBooks();
        if (props.basketList.length > 0) props.offersActions.fetchOffers(props.basketList);
        this.state= {
            qty: {
                nbre: 1,
                isbn: ""
            }
        };
    }

    handleStuff = (e) => {
        let isbn = e.target.getAttribute('isbn');
        let value = e.currentTarget.value;
        this.setState({qty: {nbre: value, isbn: isbn}});
    };
    render() {
        let bookInBasket = this.props.data.filter(book => {
            return this.props.basketList.indexOf(book.isbn) !== -1;
        });
        return (
            <div>
                {this.props.dataOffers.length > 0 && (
                    <div>
                        <SpanningTable bookInBasket={bookInBasket} offer={this.props.dataOffers} handleStuff={this.handleStuff} qty={this.state.qty} />
                    </div>
                )}
            </div>
        );
    }
}

export default BookList;