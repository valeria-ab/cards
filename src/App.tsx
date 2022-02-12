import React, {useEffect} from 'react';
import {HashRouter} from "react-router-dom";
import './App.css';
import Main from './UI/Main';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuthMe} from './BLL/login/loginThunk';
import {IAppStore} from './BLL/store/store';


const App: React.FC = () => {
    const dispatch = useDispatch();

    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);

    useEffect(() => {
            dispatch(checkAuthMe())
    }, [])

    if(isLoading) return <div>loading</div>

    return (
        <div className="App">

            <HashRouter>

                <Main/>

            </HashRouter>

        </div>
    );
};

export default App;
