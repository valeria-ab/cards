import React, {useCallback} from 'react';
import Register from './Register';
import {registrationTC} from '../../BLL/register/register-reducer';
import {Navigate} from 'react-router-dom';
import {IAppStore} from '../../BLL/store/store';
import {useDispatch, useSelector} from 'react-redux';

const RegisterContainer: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const isRegistration = useSelector<IAppStore, boolean>(state => state.register.isRegistration)

    const registrationRequest = useCallback((email: string, password: string) => {
        dispatch(registrationTC({email, password}))
    }, [])

    if (isRegistration) {
        return <Navigate to={'/login'}/>
    }
    return <Register
        registrationRequest={registrationRequest}
    />;
});

export default RegisterContainer;
