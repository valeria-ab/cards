import React, {useEffect} from 'react';
import './App.css';
import Main from './UI/Main';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthMe} from './BLL/login/login-reducer';
import {IAppStore} from './BLL/store/store';
import {RequestStatusType} from './BLL/app/app-reducer';
import {CircularProgress, LinearProgress} from '@mui/material';
import MainHeader from './UI/MainHeader/MainHeader';
import RoutesComponent from './UI/Routes';



const App = React.memo(() => {

    const dispatch = useDispatch();
    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)
    const redirectToLogin = useSelector<IAppStore, boolean>(state => state.login.redirectToLogin)

    useEffect(() => {
       dispatch(checkAuthMe())
        document.title = "Playing cards"
    }, [])


    if (!isInitialized && !redirectToLogin) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: "30%",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="App">
            <MainHeader/>
            <RoutesComponent/>
        </div>
    );
});

export default App;
