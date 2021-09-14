import React, { useEffect, useState } from 'react';

// Flicking carousel library
import Flicking from '@egjs/react-flicking';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Style for Flicking carousel
import './carousel.css';

const useStyles = makeStyles({
    sprocketHoles: {
        width: '25px',
        height: '25px',
    },
    topSprocket: {
        marginTop: '3px',
    },
    bottomSprocket: {
        marginBottom: '3px',
    },
    carouselContainer: {
        width: '700px',
    },
});

const Carousel = ({ summary }) => {
    const classes = useStyles();
    const [nominationSummary, setNominationSummary] = useState([]);

    // Verifies if there is 5 items in the nomination list to set the summary and update the carousel
    useEffect(() => {
        if (summary.length === 5) {
            setNominationSummary(summary);
        }
    }, [summary]);

    // Content of each carousel which displays the nomination poster
    const getContent = nomination => {
        return (
            <div className='panel'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <img
                        width='55%'
                        alt={nomination.Title + ' poster'}
                        src={nomination.Poster}
                    />
                </Box>
            </div>
        );
    };

    // Get the sprocket holes of the filmstrip
    const getSquareHoles = () => {
        let whiteSquares = [];
        for (let i = 0; i < 20; i++) {
            whiteSquares.push(
                <Grid item>
                    <Paper className={classes.sprocketHoles} />
                </Grid>
            );
        }
        return whiteSquares;
    };

    return (
        <Grid
            container
            className='carousel classes.carouselContainer'
            direction='column'
            justify='space-between'
            alignItems='center'
        >
            {/* Top perforations of the filmstrip */}
            <Grid
                container
                item
                spacing={2}
                justify='center'
                className={classes.topSprocket}
            >
                {getSquareHoles().map(square => {
                    return square;
                })}
            </Grid>
            {/* Nomination carousel content */}
            <Grid item>
                <div className='container'>
                    <Flicking
                        className='flicking'
                        gap={25}
                        circular={true}
                        moveType={{ type: 'snap', count: 1 }}
                    >
                        {nominationSummary.length === 5
                            ? nominationSummary.map(nomination => {
                                  return getContent(nomination);
                              })
                            : ''}
                    </Flicking>
                </div>
            </Grid>
            {/* Bottom perforations of the filmstrip */}
            <Grid
                container
                item
                spacing={2}
                justify='center'
                className={classes.bottomSprocket}
            >
                {getSquareHoles().map(square => {
                    return square;
                })}
            </Grid>
        </Grid>
    );
};

export default Carousel;
