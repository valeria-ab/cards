import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './App.css';
import Main from './UI/Main';
import store from './BLL/store/store';



const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
