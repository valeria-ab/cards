import React from 'react';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './App.css';
import Main from './UI/Main';
import store from './BLL/store/store';


const App: React.FC = () => {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    );
};

export default App;
