import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    removeButton: {
        marginTop: '8px',
        borderColor: '#eb5155',
        textTransform: 'none',
        color: '#eb5155',
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
        topMargin: '25px',
    },
    nominationContainer: {
        padding: '15px',
    },
}));

const NominationItem = ({ nomination, onRemoveNomination }) => {
    const classes = useStyles();

    return (
        <Slide direction='up' in={true} mountOnEnter unmountOnExit>
            <Paper
                className={classes.nominationContainer}
                square
                variant='outlined'
            >
                <Typography>{nomination.Title}</Typography>
                <Typography className={classes.secondaryHeading}>
                    {nomination.Year}
                </Typography>
                {/* Remove nomination button */}
                <Button
                    className={classes.removeButton}
                    variant='outlined'
                    onClick={() => onRemoveNomination(nomination)}
                >
                    {' '}
                    Remove
                </Button>
            </Paper>
        </Slide>
    );
};

export default NominationItem;
