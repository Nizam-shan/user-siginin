import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Gi3DMeeple } from "react-icons/gi";

const Navbar = () => {

    const [allTypes] = useState([
        {
            id: "Home",
            name: "Home",
        },
        {
            id: "Uploadimage",
            name: "Upload Image"
        },
        {
            id: "Login",
            name: "Login",
        },
        {
            id: "User-Data",
            name: "User-Data"
        },

        {
            id: "Register",
            name: "Register"
        },
        {
            id: "Logout",
            name: "Logout",
        }
    ])
    const { type } = useParams();
    return (


        <div className='flex bg-gray-300 p-5 justify-between  w-full'>
            <div className='flex gap-8 items-center px-4 ml-5'>
                <span className='text-blue-800'><Gi3DMeeple /></span>
                <h1>ThIs-.fOr.-`u`</h1>
            </div>

            <div className='flex gap-10 items-center mr-10'>

                {allTypes.map((items) => (
                    <Link to={`/${items.id}`}>
                        <div className={
                            type === items.id
                                ? "text-blue-700 "
                                : "text-black"
                        }>
                            <h1>{items.name}</h1>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Navbar;