import React, {Component} from "react";
import {Route, Switch} from "react-router";
import {BrowserRouter as Router} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import ShowBooks from './containers/ShowBooks';
import ShowBasket from './containers/ShowBasket';
import ShowDetailsBook from './containers/ShowDetailsBook';
import {connect} from 'react-redux';
import cookie from 'react-cookies';
import {bindActionCreators} from "redux";
import * as BasketActions from "./actions/BasketAction";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = {
    root: {
        marginTop: '3rem'
    },
};

class App extends Component {
    constructor(props) {
        super(props);
        let cookies = cookie.load('basket'); // load basket
        if (typeof cookies !== 'undefined' && cookies.length > 0) {
            cookies.map((item) => {
                this.props.basket.addBasket(item);
            });
        }
    }

    componentDidUpdate() {
        const expires = new Date();
        expires.setDate(Date.now() + 60 * 60 * 24 * 14); // destruction in 15 days
        cookie.save('basket', this.props.state.basket.basket, { // save basket
            path: '/',
            expires,
            maxAge: 1000
        });
    }


    render() {

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container direction={'row'} justify={'space-around'}>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Router>
                        <Switch>
                            <Route path={"/books"}>
                                <Grid item xs={12}>
                                    <ShowBooks.SearchAppBar/>
                                </Grid>
                                <Grid item xs={9}>
                                    <ShowBooks.BookList/>
                                </Grid>
                            </Route>
                            <Route
                                path={"/book/:id"}
                                children={({match}) => (
                                    <Grid container direction={'row'} justify={'space-around'}>
                                        <Grid item xs={12}>
                                            <ShowBooks.SearchAppBar/>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <ShowDetailsBook.DetailsPage match={match}/>
                                        </Grid>
                                    </Grid>
                                )}
                            />

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
                                    <Typography variant="h2" component="h2" align={'center'}>
                                        La bibliothèque de Henri Potier
                                    </Typography>
                                </Grid>
                            </Route>
                        </Switch>
                    </Router>
                </Grid>
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

// check the props
App.propTypes = {
    basket: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));