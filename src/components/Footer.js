import React from 'react';
import './styles/Book.css';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
        width: '100%',
        height:'50px',
        backgroundColor: 'rgb(44, 56, 126)'
    }
}));

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>

        </footer>
    );
}

export default Footer;
