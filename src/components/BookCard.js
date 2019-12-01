import React from 'react';
import './styles/Book.css';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from "react-router-dom";
import * as url from '../constants/App';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';
import SpanningTableRender from "./SpanningTableRender";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function BookCard(props) {
    const {book, handleClickBasket, basketList } = props;
    const {isbn, title, cover, synopsis, price} = book;
    const [expanded, setExpanded] = React.useState(false);
    const [basketChecked, setBasketChecked] = React.useState(basketList.indexOf(isbn) !== -1);
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const toggleBasket =(e) => {
        handleClickBasket(e, basketChecked);
        setBasketChecked(!basketChecked);
    };

    return (

        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {title[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={title}
                subheader={price + ' euros'}
            />
            <CardMedia
                className={classes.media}
                image={cover}
                title="Paella dish"
            />
            <CardContent>
                <Link to={url.ROUTE_BOOK + isbn}>Fiche détaillé</Link>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" isbn={isbn} onClick={toggleBasket}>
                    {basketChecked ? <AddShoppingCartIcon color="primary" /> : <AddShoppingCartIcon />}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {synopsis}
                </CardContent>
            </Collapse>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    handleClickBasket: PropTypes.func.isRequired,
    basketList: PropTypes.array.isRequired,
};

export default BookCard;
