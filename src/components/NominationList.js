import React, { useEffect } from 'react';

// Material UI
import AlertWarning from './AlertWarning';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

// Local imports
import NominationItem from './NominationItem';
import SummaryDialog from './SummaryDialog';
import OscarSearching from '../assets/oscar-searching.png';
import OscarFound from '../assets/oscar-found.png';

const useStyles = makeStyles(theme => ({
    paperPadding: {
        padding: '25px',
    },
    imgOscarSearch: {
        marginTop: '25px',
        marginBottom: '15px',
        width: '100%',
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
        topMargin: '25px',
    },
    viewNominationButton: {
        borderColor: '#428bca',
        color: '#428bca',
        textTransform: 'none',
    },
}));

const NominationList = ({ nominations, onRemoveNomination }) => {
    const classes = useStyles();
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    // Verifies whenever a nomination is added if the list is full,
    // then opens alert to indicate that list is full
    useEffect(() => {
        if (nominations.length === 5) {
            setOpenAlert(true);
        } else {
            setOpenAlert(false);
        }
    }, [nominations]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const getAlertContent = () => {
        return (
            <Box display='flex' alignItems='center'>
                <Typography className={classes.secondaryHeading}>
                    You have 5 nominations!{' '}
                </Typography>
                <Button
                    style={{
                        marginLeft: '10px',
                        textTransform: 'none',
                        color: '#e9a97c',
                        borderColor: '#e9a97c',
                    }}
                    variant='outlined'
                    onClick={() => setOpenDialog(true)}
                >
                    <Typography>View</Typography>
                </Button>
            </Box>
        );
    };

    // Returns top message of nomination list when the list is empty
    if (nominations.length === 0) {
        return (
            <Slide direction='down' in={true} mountOnEnter unmountOnExit>
                <Paper variant='outlined' className={classes.paperPadding}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography align='center' variant='h5'>
                                Nominations
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                align='center'
                                className={classes.secondaryHeading}
                            >
                                There are no nominations!
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <img
                                className={classes.imgOscarSearch}
                                alt='Oscar the Penguin searching for award nominations'
                                src={OscarSearching}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align='center'>
                                Help Oscar the Penguin look for 5 nominations!
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Slide>
        );
    }

    // Returns a nomination item content
    const renderedList = nominations.map(nomination => {
        return (
            <NominationItem
                key={nomination.imdbID}
                nomination={nomination}
                onRemoveNomination={onRemoveNomination}
            />
        );
    });

    return (
        <Collapse in={true}>
            <div>
                <Paper variant='outlined' className={classes.paperPadding}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography align='center' variant='h5'>
                                Nominations
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                align='center'
                                className={classes.secondaryHeading}
                            >
                                You have {nominations.length} nomination
                                {nominations.length === 1 ? '' : 's'}!
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            {nominations.length === 5 ? (
                                <img
                                    className={classes.imgOscarSearch}
                                    alt='Oscar the Penguin searching for award nominations'
                                    src={OscarFound}
                                />
                            ) : (
                                ''
                            )}
                        </Grid>
                        {nominations.length === 5 ? (
                            <Grid container item xs={12} justify='center'>
                                <Button
                                    className={classes.viewNominationButton}
                                    variant='outlined'
                                    onClick={() => setOpenDialog(true)}
                                >
                                    View Your Nominations
                                </Button>
                            </Grid>
                        ) : (
                            ''
                        )}
                    </Grid>
                </Paper>
                {renderedList}
            </div>
            {/* Alerts and dialogs for the state of nomination list */}
            <div>
                <AlertWarning
                    content={getAlertContent()}
                    handleOpen={openAlert}
                    handleClose={handleCloseAlert}
                />
                <SummaryDialog
                    nominations={nominations}
                    openDialog={openDialog}
                    handleCloseDialog={() => setOpenDialog(false)}
                />
            </div>
        </Collapse>
    );
};

export default NominationList;
