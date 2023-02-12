import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "./Homelayout"; 
 
 
const HomeLayoutHoc = ({component: Component, ...rest}) => {
    return (
        <>
        <Route
        {...rest}
        component = {(props)=>(
            <HomeLayout>
                <Component {...rest} />
            </HomeLayout>
        )
        }
        />
        </>
    )
}
 
 export default HomeLayoutHoc;