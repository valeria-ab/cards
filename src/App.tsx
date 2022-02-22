import React, {useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import Main from './UI/Main';
import {useDispatch} from 'react-redux';
import {checkAuthMe} from './BLL/login/login-reducer';



const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(checkAuthMe())
    }, [])

    return (
        <div className="App">
            <HashRouter>
                <Main/>
            </HashRouter>
        </div>
    );
};

export default App;
