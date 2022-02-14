import React from 'react';
import RoutesComponent from './Routes';
import MainHeader from './MainHeader/MainHeader';

// headers, routes, footers
const Main: React.FC = () => {

    return (
        <>
            <MainHeader/>
            <RoutesComponent/>
        </>
    );
};

export default Main;
