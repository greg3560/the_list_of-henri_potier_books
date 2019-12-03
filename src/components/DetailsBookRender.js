import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(6),
        position: 'relative'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain'
    },
    p: {
        marginBottom: '1rem'
    },
    price: {
        position: 'absolute',
        top: '13px',
        right: '20px'
    },
    headline: {
        margin: '20px 0'
    }
}));

function DetailsBookRender(props) {
    const {book, handleClickBasket, basketList} = props;
    const {isbn, title, cover, synopsis, price} = book;
    const [basketChecked, setBasketChecked] = React.useState(basketList.indexOf(isbn) !== -1);
    const classes = useStyles();

    const toggleBasket = (e) => {
        handleClickBasket(e, basketChecked);
        setBasketChecked(!basketChecked);
    };

    return (
        <Paper className={classes.root}>
            <Grid container direction={'row'} justify={'center'}>
                <Grid item xs={10}>
                    <Typography variant="h5" component="h3" className={classes.headline}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h5" component="h3" className={classes.headline} noWrap={true}>
                        {price + ' €'}
                    </Typography>
                </Grid>
            </Grid>
            <CardMedia
                className={classes.media}
                image={cover}
                title={title}
            />
            <Grid container direction={'row'} justify={'space-between'}>
                <Grid item xs={11}>
                    <Typography variant="h5" component="h3" className={classes.headline}>
                        Synopsis:
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="add to favorites" isbn={isbn} onClick={toggleBasket}>
                        {basketChecked ? <AddShoppingCartIcon color="primary"/> : <AddShoppingCartIcon/>}
                    </IconButton>
                </Grid>
            </Grid>
            {synopsis.map((item, index) =>
                <Typography key={index} component="p" className={classes.p}>{item}</Typography>)}
        </Paper>
    );
}

DetailsBookRender.propTypes = {
    book: PropTypes.object.isRequired,
    handleClickBasket: PropTypes.func.isRequired,
    basketList: PropTypes.array.isRequired,
};

export default DetailsBookRender;