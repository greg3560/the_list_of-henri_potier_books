import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import * as url from "../constants/App";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import SpanningTableRender from "./SpanningTableRender";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    linkText: {
        fontSize: '1rem',
        fontFamily: "Roboto, Helvetica, Arial",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    }
});

function TemporaryDrawer(props) {
    const {handleClickMenu, open } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open, firstCall = false) => event => {
        if (!firstCall && !open) handleClickMenu();
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setState({...state, [side]: open});
    };

    //effect hook equivalent to componentDidUpdate
    useEffect(() => {
        toggleDrawer('left', open, true)({type: '', key: ''});
    }, [open]);

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['Accueil', 'Livres', 'Panier', 'Livre'].map((text, index) => {
                    switch (text) {
                        case 'Accueil':
                            return (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <Link to={url.BASE_URL} className={classes.linkText}><ListItemText
                                        primary={text}/></Link>
                                </ListItem>
                            );
                        case 'Livres':
                            return (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <Link to={url.ROUTE_BOOKS} className={classes.linkText}><ListItemText
                                        primary={text}/></Link>
                                </ListItem>
                            );
                        case 'Panier':
                            return (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <Link to={url.ROUTE_BASKET} className={classes.linkText}><ListItemText
                                        primary={text}/></Link>
                                </ListItem>
                            );
                    }
                })}
            </List>
        </div>
    );

    return (
        <div>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

TemporaryDrawer.propTypes = {
    handleClickMenu: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default TemporaryDrawer;