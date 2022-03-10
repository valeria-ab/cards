import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from "../../../BLL/store/store";
import {setErrorAC} from '../../../BLL/app/app-reducer';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
));

export const ErrorSnackbar = React.memo(() => {

    const error = useSelector<IAppStore, string | null>((state) => state.app.error);


    const dispatch = useDispatch();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null));
    };

    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
})
