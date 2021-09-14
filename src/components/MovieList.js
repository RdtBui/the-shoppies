import React, { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

// Local imports
import EmptyTheater from '../assets/empty-theater.png';
import MovieItem from './MovieItem';
import AlertWarning from './AlertWarning';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '25px',
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
    },
    theaterImg: {
        margin: '25px 0px',
        width: '100%',
    },
    theaterImgContainer: {
        padding: '0px 70px',
    },
    loadMoreButton: {
        width: '100%',
        margin: '20px 0px',
        textTransform: 'none',
        color: '#428bca',
        borderColor: '#428bca',
    },
    emptyTheaterTop: {
        marginTop: '20px',
    },
}));

const MovieList = ({
    movies,
    onNominate,
    nominations,
    handleLoadMore,
    resultsAmount,
}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    // Handles if a movie detail is expanded or not
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const renderedList = movies.map(movie => {
        let index = movies.indexOf(movie) + 1;
        return (
            <MovieItem
                panelIndex={index}
                movie={movie}
                onNominate={onNominate}
                nominations={nominations}
                expanded={expanded}
                handleChange={handleChange}
                handleAlert={handleOpenAlert}
            />
        );
    });

    // Returns a card with image indicating that the search hasn't been initiated yet
    const moviePlaceholder = () => {
        return (
            <Slide direction='up' in={true} mountOnEnter unmountOnExit>
                <Card>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item xs={12}>
                            <Typography
                                className={classes.emptyTheaterTop}
                                variant='h5'
                            >
                                Uh oh... it seems to be empty in here
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.secondaryHeading}>
                                Search and add movies to your list
                            </Typography>
                        </Grid>
                        <Grid
                            className={classes.theaterImgContainer}
                            item
                            xs={12}
                            justify='center'
                        >
                            <img
                                alt='Empty theater seats'
                                className={classes.theaterImg}
                                src={EmptyTheater}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Slide>
        );
    };

    return (
        <div className={classes.root}>
            <div>
                {renderedList.length === 0 ? moviePlaceholder() : renderedList}
            </div>
            {movies.length === 0 || movies.length >= resultsAmount ? (
                ''
            ) : (
                // More results button
                <Button
                    className={classes.loadMoreButton}
                    variant='outlined'
                    onClick={handleLoadMore}
                >
                    More Results
                </Button>
            )}
            <div>
                {/* Fires a warning alert when you try to add a movie when it's full */}
                <AlertWarning
                    content='Your nomination list is full!'
                    handleOpen={openAlert}
                    handleClose={handleCloseAlert}
                />
            </div>
        </div>
    );
};

export default MovieList;
