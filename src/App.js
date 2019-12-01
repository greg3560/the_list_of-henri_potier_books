import React, {Component} from "react";
import {Route, Switch} from "react-router";
import {BrowserRouter as Router} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import ShowBooks from './containers/ShowBooks';
import ShowBasket from './containers/ShowBasket';
import {connect} from 'react-redux';
import cookie from 'react-cookies'
import {bindActionCreators} from "redux";
import * as BasketActions from "./actions/BasketAction";
import './components/styles/normalize.css';
import Grid from "@material-ui/core/Grid";


const styles = {
    root: {},
};

class App extends Component {
    constructor(props) {
        super(props);

        let cookies = cookie.load('basket');
        if (typeof cookies !== 'undefined' && cookies.length > 0) {
            cookies.map((item) => {
                this.props.basket.addBasket(item);
            });
        }
    }

    componentDidUpdate() {
        const expires = new Date();
        expires.setDate(Date.now() + 60 * 60 * 24 * 14); // destruction in 15 days
        cookie.save('basket', this.props.state.basket.basket, {
            path: '/',
            expires,
            maxAge: 1000
        });
    }


    render() {

        const {classes} = this.props;
        return (
            <Grid className={classes.root}>
                <Grid container direction={'row'} justify={'space-around'}>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Router>
                        <Switch>
                            <Route path={"/books"}>
                                <Grid item xs={12}>
                                    <ShowBooks.SearchAppBar/>
                                </Grid>
                                <Grid item xs={10}>
                                    <ShowBooks.BookList/>
                                </Grid>
                            </Route>
                            <Route path={"/book/:id"} component={DetailsPage}/>
                            <Route path={"/basket"}>
                                <Grid item xs={12}>
                                    <ShowBooks.SearchAppBar/>
                                </Grid>
                                <Grid item xs={10}>
                                    <ShowBasket.Basket/>
                                </Grid>
                            </Route>
                            <Route path={"/"} component={ShowBooks.SearchAppBar}>
                                <Grid item xs={12}>
                                    <ShowBooks.SearchAppBar/>
                                </Grid>>
                            </Route>
                        </Switch>
                    </Router>
                </Grid>
            </Grid>
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