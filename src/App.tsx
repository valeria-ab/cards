import React, {useEffect} from 'react';
import './App.css';
import Main from './UI/Main';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthMe} from './BLL/login/login-reducer';
import {IAppStore} from './BLL/store/store';
import {RequestStatusType} from './BLL/app/app-reducer';
import {CircularProgress, LinearProgress} from '@mui/material';



const App: React.FC = () => {
    // console.log("app")
    const dispatch = useDispatch();
    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)
    const redirectToLogin = useSelector<IAppStore, boolean>(state => state.login.redirectToLogin)
    const status = useSelector<IAppStore, RequestStatusType>(
        (state) => state.app.status
    );

    useEffect(() => {
       dispatch(checkAuthMe())
        document.title = "Playing cards"
    }, [])


    // if(!isInitialized && !redirectToLogin) return <div>loading...</div>
    // if(redirectToLogin) {
    //     return <Navigate to={'/login'}/>
    // }

    // if (!isInitialized && !redirectToLogin) {
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
            {status === "loading" && <LinearProgress />}
                <Main/>

        </div>
    );
};

export default App;
