import React from "react";
import Header from "./Header";
import RoutesComponent from "./Routes";

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
