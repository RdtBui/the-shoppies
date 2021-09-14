import React, { useState, useEffect } from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';

// API
import omdb from '../api/omdb';
import youtube from '../api/youtube';

const useStyles = makeStyles({
    bold: {
        fontWeight: 600,
    },
    detailMargin: {
        margin: '10px 15px',
    },
    trailer: {
        width: '100%',
    },
    awardsContainer: {
        borderColor: '#41b3a3',
        padding: '8px 10px',
        width: '100%',
        backgroundColor: '#beebd5',
    },
    videoContainer: {
        position: 'relative',
        paddingTop: '56.25%',
        width: '100%',
    },
    infoIcon: {
        color: '#41b3a3',
        marginRight: '7px',
    },
    trailerContainer: {
        position: 'relative',
        paddingTop: '56.25%',
        width: '100%',
    },
    card: {
        padding: '15px',
    },
    containerDetailTop: {
        margin: '0px -5px',
    },
});

const MovieDetails = ({ movieId, expanded }) => {
    const classes = useStyles();
    const [actors, setActors] = useState('');
    const [awards, setAwards] = useState('');
    const [boxOffice, setBoxOffice] = useState('');
    const [director, setDirector] = useState('');
    const [genres, setGenres] = useState([]);
    const [plot, setPlot] = useState('');
    const [ratings, setRatings] = useState([]);
    const [title, setTitle] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [writer, setWriter] = useState('');

    // API request to get detailed movie information
    useEffect(() => {
        const fetchData = async () => {
            const response = await omdb.get('', {
                params: {
                    i: movieId,
                },
            });

            const results = response.data;

            setActors(results.Actors);
            setAwards(results.Awards);
            setBoxOffice(results.BoxOffice);
            setGenres(results.Genre);
            setDirector(results.Director);
            setRatings(results.Ratings);
            setPlot(results.Plot);
            setTitle(results.Title);
            setWriter(results.Writer);
        };
        fetchData();
    }, [movieId]);

    // YouTube API request for trailer videos
    useEffect(() => {
        const fetchData = async () => {
            const searchTerm = title + ' trailer';
            const response = await youtube.get('/search', {
                params: {
                    q: searchTerm,
                },
            });
            const results = response.data;

            setTrailerUrl(
                `https://youtube.com/embed/${results.items[0].id.videoId}`
            );
        };
        fetchData();
    }, [expanded, title]);

    // Returns the content for ratings depending on which rating is received
    const displayRatings = ratings
        ? ratings.map(rating => {
              return (
                  <div key={rating.Value + rating.Source}>
                      <Typography className={classes.bold}>
                          {rating.Source}
                      </Typography>
                      <Typography>{rating.Value}</Typography>
                  </div>
              );
          })
        : null;

    // Displays the YouTube video using ReactPlayer
    const displayTrailer = trailerUrl ? (
        <div className={classes.trailerContainer}>
            <ReactPlayer
                // className={classes.videoPlayer}
                width='100%'
                height='100%'
                url={trailerUrl}
                style={{ position: 'absolute', top: '0', left: '0' }}
            />
        </div>
    ) : null;

    // Reusable card container for movie details
    const customCard = (contentText, content) => {
        return (
            <Card className={classes.card} square variant='outlined'>
                <Typography className={classes.bold}>{contentText}</Typography>
                <Typography>{content}</Typography>
            </Card>
        );
    };

    return (
        <Grid container display='flex' className={classes.detailMargin}>
            <Grid
                className={classes.containerDetailTop}
                container
                justify='center'
                spacing={5}
            >
                <Grid item xs={12} sm={6} md={4}>
                    {customCard('Box Office', boxOffice)}
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    {customCard('Genres', genres)}
                </Grid>
            </Grid>
            <Grid container className={classes.detailMargin}>
                {awards === 'N/A' ? (
                    ''
                ) : (
                    <Grid item container xs={12} alignContent='center'>
                        <Box
                            className={classes.awardsContainer}
                            borderLeft={3}
                            display='flex'
                        >
                            <InfoTwoToneIcon className={classes.infoIcon} />
                            <Typography>{awards}</Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>

            <Grid container className={classes.detailMargin}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card square variant='outlined' style={{ padding: '15px' }}>
                        <Grid container>
                            <Grid container item xs={12} sm={12} md={4}>
                                {' '}
                                <Typography>{displayRatings}</Typography>{' '}
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                sm={12}
                                md={8}
                                display='flex'
                            >
                                {displayTrailer}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

            <Grid item className={classes.detailMargin}>
                {customCard('Plot', plot)}
            </Grid>

            <Grid item xs={12} className={classes.detailMargin}>
                {customCard('Director', director)}
                {customCard('Writer', writer)}
                {customCard('Actors', actors)}
            </Grid>
        </Grid>
    );
};

export default MovieDetails;
