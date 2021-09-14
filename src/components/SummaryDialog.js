import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

// Local imports
import Carousel from './Carousel';

const useStyles = makeStyles({
    dialog: {
        width: '50vw',
        marginLeft: '25vw',
    },
    carouselContainer: {
        height: '100%',
    },
    closeButton: {
        textTransform: 'none',
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function SummaryDialog({
    nominations,
    openDialog,
    handleCloseDialog,
}) {
    const classes = useStyles();
    return (
        <Dialog
            className={classes.dialog}
            open={openDialog}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth='xl'
            keepMounted
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {'Your nominations'}
            </DialogTitle>
            <DialogContent>
                <div className={classes.carouselContainer}>
                    <Carousel summary={nominations} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={handleCloseDialog}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
