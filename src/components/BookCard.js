import React from 'react';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";
import * as url from '../constants/App';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";

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
    const {book, handleClickBasket, basketList} = props;
    const {isbn, title, cover, synopsis, price} = book;
    const [expanded, setExpanded] = React.useState(false);
    const [basketChecked, setBasketChecked] = React.useState(basketList.indexOf(isbn) !== -1);
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const toggleBasket = (e) => {
        handleClickBasket(e, basketChecked);
        setBasketChecked(!basketChecked);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {title[0]}
                        </Avatar>
                    }
                    title={title}
                    subheader={price + ' €'}
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
                        {basketChecked ? <AddShoppingCartIcon color="primary"/> : <AddShoppingCartIcon/>}
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
                        {synopsis[0]}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    handleClickBasket: PropTypes.func.isRequired,
    basketList: PropTypes.array.isRequired,
};

export default BookCard;
