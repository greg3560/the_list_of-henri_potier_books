import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {withStyles} from '@material-ui/styles';
import component from './containers/ShowBooks';
import * as url from './constants/App';


const styles = {
    root: {},
};

class App extends Component {

    render() {
        const {classes} = this.props;
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
                                <h1>basket</h1>
                            </div>
                        </Route>
                        <Route path={"/"}>
                            <div>
                                <component.SearchAppBar/>
                                <component.BookList/>
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

export default withStyles(styles)(App);