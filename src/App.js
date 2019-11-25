import React, {Component} from "react";
import {withStyles} from '@material-ui/styles';
import BallSpinner from './icon/BallSpinner';

const styles = {
    root: {
        background: 'red'
    },
};

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <h1>Hello world!</h1>
                <BallSpinner/>
            </div>
        );
    }
}

export default withStyles(styles)(App);
