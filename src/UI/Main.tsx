import React from "react";
import Header from "./Header";
import RoutesComponent from "./Routes";
import {Forgot} from "./Forgot/Forgot";

// headers, routes, footers
const Main: React.FC = () => {
    return (
        <>
            <Header/>
            <Forgot/>
            <RoutesComponent/>
        </>
    );
};

export default Main;
