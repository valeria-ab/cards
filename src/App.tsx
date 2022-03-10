import React, {useEffect} from 'react';
import {HashRouter, Navigate} from 'react-router-dom';
import './App.css';
import Main from './UI/Main';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthMe} from './BLL/login/login-reducer';
import {IAppStore} from './BLL/store/store';



const App: React.FC = () => {
    const dispatch = useDispatch();
    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)
    const redirectToLogin = useSelector<IAppStore, boolean>(state => state.login.redirectToLogin)

    useEffect(() => {
       dispatch(checkAuthMe())
    }, [])


    if(!isInitialized && !redirectToLogin) return <div>loading...</div>
    // if(redirectToLogin) {
    //     return <Navigate to={'/login'}/>
    // }
    console.log("app")
    return (
        <div className="App">

                <Main/>

        </div>
    );
};

export default App;
