import React, {useEffect} from 'react';
import {HashRouter, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import Main from './UI/Main';
import {checkAuthMe} from "./BLL/login/loginThunk";
import {IAppStore} from "./BLL/store/store";



const App: React.FC = () => {



    return (
        <div className="App">

            <HashRouter>

                <Main/>

            </HashRouter>

        </div>
    );
};

export default App;
