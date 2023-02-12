import React from "react";
import Navbar from "../components/Navbar";

const HomeLayout = (props) => {
    return(
        <>
            <div>
            <Navbar />
           
            </div>
            {props.children}
            
        </>
    )
}

export default HomeLayout;