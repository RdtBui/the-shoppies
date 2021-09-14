import React, { useState } from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

// Local imports
import SearchBar from './components/SearchBar';
import NominationList from './components/NominationList';
import MovieList from './components/MovieList';
import omdb from './api/omdb';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    pageBackground: {
        backgroundColor: '#f9fafb',
    },
    scrollTopButton: {
        color: '#429bca',
    },
    dividerMargin: {
        margin: '50px 0px',
    },
}));

const App = props => {
    const classes = useStyles();
    const [movies, setMovies] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [pageLoaded, setPageLoaded] = useState(1);
    const [resultsAmount, setResultsAmount] = useState(0);
    const [term, setTerm] = useState('');

    const onTermSubmit = async term => {
        // HTTPS request to OMDB API
        const response = await omdb.get('', {
            params: {
                s: term,
            },
        });

        if (response.data.Response === 'False') {
            setSearchError(response.data.Error);
        } else {
            setSearchError('');
            setTerm(term);
            setResultsAmount(response.data.totalResults);
            setMovies(response.data.Search);
        }
    };

    const handleLoadMore = async () => {
        // HTTPS request to OMDB API
        console.log('Term is ' + term);
        const response = await omdb.get('', {
            params: {
                s: term,
                page: pageLoaded + 1,
            },
        });
        // Keeps track of how many times the user has clicked on load more button
        setPageLoaded(pageLoaded + 1);

        if (response.data.Response === 'False') {
            setSearchError(response.data.Error);
        } else {
            setSearchError('');

            const newMovies = response.data.Search;

            // Append movie from next page to the current array of movies
            newMovies.map(newMovie => {
                return setMovies(oldMovies => [...oldMovies, newMovie]);
            });
        }
    };

    const onRemoveNomination = movie => {
        const newList = nominations.filter(movieItem => movieItem !== movie);
        setNominations(newList);
    };

    const ScrollTop = props => {
        const { children, window } = props;
        const classes = useStyles();
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
            disableHysteresis: true,
            threshold: 100,
        });

        const handleClick = event => {
            const anchor = (
                event.target.ownerDocument || document
            ).querySelector('#back-to-top-anchor');

            if (anchor) {
                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        return (
            <Zoom in={trigger}>
                <div
                    onClick={handleClick}
                    role='presentation'
                    className={classes.root}
                >
                    {children}
                </div>
            </Zoom>
        );
    };

    return (
        <div className={classes.pageBackground}>
            <div>
                <Container maxWidth='lg'>
                    <Toolbar id='back-to-top-anchor' />
                    <Slide
                        direction='right'
                        in={true}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Typography variant='h4'>The Shoppies</Typography>
                    </Slide>
                    <Divider
                        className={classes.dividerMargin}
                        variant='middle'
                    />
                    <Grid container spacing={5} justify='center'>
                        <Grid item xs={12} sm={4}>
                            <NominationList
                                nominations={nominations}
                                onRemoveNomination={onRemoveNomination}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div>
                                <SearchBar
                                    onTermSubmit={onTermSubmit}
                                    searchError={searchError}
                                    resultsAmount={resultsAmount}
                                />
                                <MovieList
                                    movies={movies}
                                    onNominate={movie => {
                                        setNominations(oldNominations => [
                                            ...oldNominations,
                                            movie,
                                        ]);
                                    }}
                                    nominations={nominations}
                                    searchError={searchError}
                                    handleLoadMore={handleLoadMore}
                                    resultsAmount={resultsAmount}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <ScrollTop {...props}>
                <Fab
                    className={classes.scrollTopButton}
                    size='small'
                    aria-label='scroll back to top'
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div>
    );
};

export default App;
