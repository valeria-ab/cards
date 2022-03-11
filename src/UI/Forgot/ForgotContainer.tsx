import React from 'react';
import {Forgot} from './Forgot';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../BLL/store/store';
import {setErrorAC} from '../../BLL/app/app-reducer';
import {forgotPasswordTC} from '../../BLL/forgot/forgot-reducer';


const ForgotPasswordContainer: React.FC = () => {
    const dispatch = useDispatch()
    const isRequestSend = useSelector<IAppStore, boolean>(state => state.forgotPassword.isRequestSend)
    const setError = (value: string) => {
        dispatch(setErrorAC(value))
    }
    const forgotPasswordRequest = (value: string) => {
        dispatch(forgotPasswordTC(value))
    }

    return <Forgot
        isRequestSend={isRequestSend}
        setError={setError}
        forgotPasswordRequest={forgotPasswordRequest}
    />;
};

export default ForgotPasswordContainer;
