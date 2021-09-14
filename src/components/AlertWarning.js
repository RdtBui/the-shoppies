import React from 'react';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AlertWarning({ content, handleOpen, handleClose }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar
                open={handleOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='warning'>
                    {content}
                </Alert>
            </Snackbar>
        </div>
    );
}
