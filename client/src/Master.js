import React from "react";
import {useParams} from 'react-router-dom';
import Temp from './components/Temp'
import Login from "./components/Login";
import Signin from "./components/Sigin";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Uploadimage from "./components/Uploadimage";


const Master = () => {
    const {type} = useParams();
    return (
       <div className="justify-evenly">
        {type === "Home" && <Home />}
        {type === "User-Data" && <Temp />}
        {type === "Login" && <Login />}
        {type === "Register" && <Signin />}
        {type === "Logout" && <Logout /> }
        {type === "Uploadimage" && <Uploadimage />}
       
       </div>
    )
}

export default Master;