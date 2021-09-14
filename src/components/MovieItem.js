import React, { useState, useEffect } from 'react';

// Material UI
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Local imports
import NA from '../assets/na.png';
import omdb from '../api/omdb';
import MovieDetails from './MovieDetails';

const useStyles = makeStyles(theme => ({
    secondaryHeading: {
        color: theme.palette.text.secondary,
    },
    nominateButtonMargin: {
        margin: '15px 0px',
    },
    button: {
        textTransform: 'none',
        padding: '7px 20px',
        color: '#428bca',
        borderColor: '#428bca',
    },
    infoIcon: {
        color: 'orange',
        marginRight: '10px',
    },
    moviePoster: {
        width: '100%',
        maxWidth: '120px',
        height: 'auto',
    },
}));

const MovieItem = ({
    movie,
    onNominate,
    nominations,
    panelIndex,
    expanded,
    handleChange,
    handleAlert,
}) => {
    const classes = useStyles();
    const movieId = movie.imdbID;
    const [title, setTitle] = useState('');
    const [runtime, setRuntime] = useState('');
    const [releasedYear, setReleasedYear] = useState('');
    const [country, setCountry] = useState('');
    const [rated, setRated] = useState('');
    const [isDisable, setIsDisable] = useState(false);

    // API request to OMDB to get movie information
    useEffect(() => {
        const fetchData = async () => {
            const response = await omdb.get('', {
                params: {
                    i: movieId,
                },
            });
            const results = response.data;

            setTitle(results.Title);
            setRuntime(results.Runtime);
            setReleasedYear(results.Year);
            setCountry(results.Country);
            setRated(results.Rated);
        };
        fetchData();
    }, [movieId]);

    // Disable and enable button according to nomination
    useEffect(() => {
        if (nominations.includes(movie)) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [nominations, movie]);

    // Extract more detailed information of the movie when more info is needed
    const onNominateMovie = nominatedMovie => {
        if (nominations.length === 4) {
            // Nominations should be full after this call
            onNominate(nominatedMovie);
        } else if (nominations.length < 5) {
            setIsDisable(true);
            // Nominations not full, then don't disable button
            onNominate(nominatedMovie);
        } else if (nominations.length === 5) {
            // Displays Alert when try to add new movie when nominations list is full
            handleAlert();
        }
    };

    return (
        <React.Fragment>
            <Accordion
                expanded={expanded === `panel${panelIndex}`}
                onChange={handleChange(`panel${panelIndex}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${panelIndex}bh-content`}
                    id={`panel${panelIndex}bh-header`}
                >
                    <Grid container direction='row'>
                        <Grid item sm='3'>
                            <img
                                className={classes.moviePoster}
                                alt={movie.Title}
                                src={movie.Poster === 'N/A' ? NA : movie.Poster}
                            />
                        </Grid>

                        <Grid alignItems='flex-start' sm='9'>
                            <Box
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                            >
                                <Typography variant='h5'>{title}</Typography>
                                <Typography
                                    className={classes.secondaryHeading}
                                >
                                    {rated === 'N/A' ? '' : `${rated}  |  `}
                                    {runtime} | {releasedYear} ({country}){' '}
                                </Typography>
                                <Box
                                    // Prevents the nominate button from opening the detail sheet
                                    onClick={event => event.stopPropagation()}
                                    onFocus={event => event.stopPropagation()}
                                    flexDirection='column'
                                    display='flex'
                                    alignItems='center'
                                    className={classes.nominateButtonMargin}
                                >
                                    <span style={{ cursor: 'not-allowed' }}>
                                        <Button
                                            className={classes.button}
                                            endIcon={<AddCircleOutlineIcon />}
                                            disabled={isDisable}
                                            size='small'
                                            variant='outlined'
                                            onClick={() =>
                                                onNominateMovie(movie)
                                            }
                                        >
                                            <Typography>Nominate</Typography>
                                        </Button>
                                    </span>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <Divider variant='middle' />
                <AccordionDetails>
                    <MovieDetails movieId={movieId} />
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    );
};

export default MovieItem;
