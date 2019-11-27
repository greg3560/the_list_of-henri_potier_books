import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {withStyles} from '@material-ui/styles';
import ShowBooks from './containers/ShowBooks';
import ShowBasket from './containers/ShowBasket';
import * as url from './constants/App';
import {connect} from 'react-redux';
import cookie from 'react-cookies'
import {bindActionCreators} from "redux";
import * as BasketActions from "./actions/BasketAction";


const styles = {
    root: {},
};

class App extends Component {
    constructor(props) {
        super(props);

        let cookies = cookie.load('basket');
        if (typeof cookies !== 'undefined' && cookies.length > 0) {
            cookies.map((item, index) => {
                this.props.basket.addBasket(item);
            });
        }
    }

    componentDidUpdate() {
        const expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        // cookie.save(
        //     'basket',
        //     '1234',
        //     {
        //         path: '/',
        //         expires,
        //         maxAge: 1000,
        //         domain: 'http://localhost',
        //         secure: true,
        //         httpOnly: true
        //     }
        // )
        // Stuff();
        cookie.save('basket', this.props.state.basket.basket, { path: '/' });
    }

    render() {

        const {classes} = this.props;
        // console.log('this.props', this.props);
        // let history = useHistory();
        return (
            <div className={classes.root}>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={url.BASE_URL}>Accueil</Link>
                            </li>
                            <li>
                                <Link to={url.ROUTE_BOOKS}>Voir les livres</Link>
                            </li>
                            <li>
                                <Link to={url.ROUTE_BASKET}>Panier</Link>
                            </li>
                            <li>
                                <Link to="/book/23">book23</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path={"/books"}>
                            <div>
                                <h1>books</h1>
                            </div>
                        </Route>
                        <Route path={"/book/:id"} component={DetailsPage}/>
                        <Route path={"/basket"}>
                            <div>
                                <ShowBasket.Basket/>
                            </div>
                        </Route>
                        <Route path={"/"}>
                            <div>
                                <ShowBooks.SearchAppBar/>
                                <ShowBooks.BookList/>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

class DetailsPage extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.match.params.id}</h2>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};

const mapDispatchToProps = (dispatch) => ({
    basket: bindActionCreators(BasketActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));