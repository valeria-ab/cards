import React from "react";
import Header from "./Header";
import RoutesComponent from "./Routes";
import {useDispatch} from "react-redux";
import MainHeader from './MainHeader/MainHeader';

// headers, routes, footers
const Main: React.FC = () => {
    const dispatch = useDispatch()


    return (
        <>
            <MainHeader/>
            <Header/>

            <RoutesComponent/>
        </>
    );
};

export default Main;
