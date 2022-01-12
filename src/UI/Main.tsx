import React from "react";
import Header from "./Header";
import RoutesComponent from "./Routes";
import {Forgot} from "./Forgot/Forgot";
import {NewPassword} from "./Forgot/NewPassword";

// headers, routes, footers
const Main: React.FC = () => {
    return (
        <>
            <Header/>
            <RoutesComponent/>
        </>
    );
};

export default Main;
