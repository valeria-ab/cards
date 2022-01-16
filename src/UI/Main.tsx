import React from "react";
import Header from "./Header";
import RoutesComponent from "./Routes";
import {useDispatch} from "react-redux";

// headers, routes, footers
const Main: React.FC = () => {
    const dispatch = useDispatch()


    return (
        <>
            <Header/>

            <RoutesComponent/>
        </>
    );
};

export default Main;
