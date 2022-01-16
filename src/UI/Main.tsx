import React, {useEffect} from "react";
import Header from "./Header";
import RoutesComponent from "./Routes";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthMe} from "../BLL/login/loginThunk";
import {IAppStore} from "../BLL/store/store";
import { Navigate } from "react-router-dom";

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
