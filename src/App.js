import React, {Component} from "react";
import {withStyles} from '@material-ui/styles';
import component from './containers/ShowBooks';

const styles = {
    root: {
        background: 'red'
    },
};

class App extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <component.SearchAppBar/>
                <component.BookList/>
            </div>
        );
    }
}

export default withStyles(styles)(App);