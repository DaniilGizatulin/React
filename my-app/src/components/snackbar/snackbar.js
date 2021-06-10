import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const SimpleSnackbar = ({ isSnackbar, color, message }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleShow = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    useEffect(() => {
        if (isSnackbar) {
            handleShow()
        }
    }, [isSnackbar])


    return (

        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={color}>
                    {message}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert>*/}
        </div>
    );
}

export default SimpleSnackbar;