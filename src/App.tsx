import React from 'react';
import {HashRouter} from "react-router-dom";
import './App.css';
import Main from './UI/Main';


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
