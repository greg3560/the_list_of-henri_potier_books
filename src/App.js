import React, {Component} from "react";
import {withStyles} from '@material-ui/styles';
import ShowBook from './containers/ShowBooks';

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
                    <ShowBook />
            </div>
        );
    }
}

export default withStyles(styles)(App);