import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade, withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Autosuggest from 'react-autosuggest';
import './styles/SearchAppBar.css';
import {Link} from "react-router-dom";
import * as url from '../constants/App';
import TemporaryDrawer from './TemporaryDrawer';
import PropTypes from "prop-types";

// tableau contenant les suggestions
const dataAutoComplete = [];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : dataAutoComplete.filter(lang =>
        lang.title.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = ({isbn, title}) => (
    <Link to={url.ROUTE_BOOK + isbn}>{title}</Link>
);

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '3rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: '1rem',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        color: '#fff',
        border: 'none',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
});


class SearchAppBar extends React.Component {
    constructor(props) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            menuOpen: false
        };
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleClickMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    };

    render() {
        const {classes} = this.props;
        const {value, suggestions} = this.state;

        this.props.data.map((item, index) => {
            let isInArray = false;
            for (let data in dataAutoComplete[index]) {
                if (Object.prototype.hasOwnProperty.call(dataAutoComplete[index], data)) {
                    if (data === 'title') {
                        if (dataAutoComplete[index][data] === item.title) isInArray = true;
                    }
                }
            }
            if (!isInArray) dataAutoComplete.push(item);
            return '';
        });

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search…',
            value,
            onChange: this.onChange,
            'aria-label': 'search'
        };
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleClickMenu}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Henri Potier
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                theme={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                    <TemporaryDrawer open={this.state.menuOpen} handleClickMenu={this.handleClickMenu}/>
                </AppBar>
            </div>
        );
    }
}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};
export default withStyles(styles)(SearchAppBar);