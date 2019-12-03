import React, {Component} from "react";
import DetailsBookRender from './DetailsBookRender';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

class DetailsBook extends Component {
    constructor(props) {
        super(props);
        this.props.actions.fetchBooks();
    }

    componentDidMount() {
        let book = this.props.data.filter((book) => book.isbn === this.props.match.params.id);
        let isbn = book.isbn;
        this.setState({basketChecked: this.props.basketList.indexOf(isbn) !== -1});
    }

    handleClickBasket = (e, basketChecked) => { // toggle add/delete item
        let isbn = e.currentTarget.getAttribute("isbn");
        if (basketChecked) this.props.basket.deleteBasket(isbn);
        else this.props.basket.addBasket(isbn);
    };

    render() {
        return (
            <Grid container spacing={5} direction={'row'} justify={'space-between'} alignItems={'stretch'}>
                {this.props.data.length > 0 && this.props.data.filter(book => book.isbn === this.props.match.params.id).map((book, index) => {
                    return <DetailsBookRender
                        key={index}
                        book={book}
                        handleClickBasket={this.handleClickBasket}
                        basketList={this.props.basketList}
                    />;
                })}
                {this.props.data.length === 0 && <CircularProgress color="secondary" />}
            </Grid>
        );
    }
}

DetailsBook.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    basket: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    basketList: PropTypes.array.isRequired,
};

export default DetailsBook;