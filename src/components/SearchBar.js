import React, { useEffect } from 'react';

// Material UI
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ErrorTwoTone from '@material-ui/icons/ErrorTwoTone';
import { FilmData } from './FilmData';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchBar: {
        paddingTop: 11,
        paddingBottom: 13,
        paddingRight: 20,
    },
    errorIcon: {
        marginRight: 5,
    },
    autocomplete: {
        width: '100%',
    },
}));

const filter = createFilterOptions();

const SearchBar = ({ onTermSubmit, searchError, resultsAmount }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [term, setTerm] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(false);

    // Verifies for errors during search
    useEffect(() => {
        if (searchError !== '') {
            setErrorMessage(
                searchError === 'Incorrect IMDb ID.'
                    ? 'Please enter a movie title'
                    : searchError
            );
        } else {
            setErrorMessage(false);
        }
    }, [searchError]);

    // Search submit
    const onFormSubmit = event => {
        event.preventDefault();
        if (value === null) {
            onTermSubmit(null);
        } else {
            onTermSubmit(value.title);
            setTerm(value.title);
        }
    };

    // Error message under search bar
    const errorDisplay = () => {
        return (
            <Box display='flex' alignItems='center'>
                <ErrorTwoTone className={classes.errorIcon} />
                {errorMessage}
            </Box>
        );
    };

    return (
        <Slide direction='left' in={true} mountOnEnter unmountOnExit>
            <Card className={classes.searchBar} variant='outlined'>
                <Autocomplete
                    value={value}
                    className={classes.autocomplete}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                title: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                title: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                title: `Search for "${params.inputValue}"`,
                            });
                        }
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={FilmData}
                    getOptionLabel={option => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                    }}
                    renderOption={option => option.title}
                    freeSolo
                    renderInput={params => (
                        <Grid container direction='row' alignItems='center'>
                            <Grid
                                container
                                item
                                xs={2}
                                sm={1}
                                md={1}
                                justify='center'
                            >
                                <SearchIcon
                                    justify='center'
                                    className={classes.searchIcon}
                                />
                            </Grid>
                            <Grid item xs={10} sm={11} md={11}>
                                <form onSubmit={onFormSubmit}>
                                    <TextField
                                        error={errorMessage ? true : false}
                                        helperText={
                                            errorMessage
                                                ? errorDisplay()
                                                : resultsAmount === 0
                                                ? ''
                                                : `Found ${resultsAmount} results for "${term}"`
                                        }
                                        size='small'
                                        variant='outlined'
                                        label='Search a Movie'
                                        margin='dense'
                                        {...params}
                                    />
                                </form>
                            </Grid>
                        </Grid>
                    )}
                />
            </Card>
        </Slide>
    );
};

export default SearchBar;
