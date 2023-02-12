

import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Temp = () => {
  const history = useHistory();
  const [UserData, setUserData] = useState({})

  const [show, setShow] = useState(false);
  //  


  const getData = async () => {
    try {
      const res = await fetch('/Temp ', {
        method: "GET",
        headers: {
          //  Accept : "application/json",
          "Content-Type": "application/json"
        },
        //credentials:"include"
      });

      const data = await res.json();
      console.log("data");
      console.log(data);

      setUserData(data);
      setShow(true);

      // history.push("/Login")
      if (!res.status === 200) {
        // const error = new Error(res.error);
        // throw error;
        console.log("error");
      }

    } catch (err) {

      console.log(err);
      //history.push('./Login');
    }
  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="bg_image"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhY2tncm91bmQlMjBpbWFnZSUyMHRvJTIwZGlzcGxheSUyMHRleHR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)',
          backgroundSize: "cover",
          height: "100vh",

        }}>
        {show ?
          <div className="text-center pt-48 gap-4">
            <h1 className="text-4xl text-black font-semibold">User ID  <br></br> <span className="font-bold text-blue-700"> {UserData._id}</span> </h1>
            <br></br>
            <h1 className="text-2xl text-black font-semibold" >User Name <br></br>  <span className="font-bold text-blue-700">{UserData.name}</span> </h1>
            <br></br>
            <h1 className="text-2xl text-black font-semibold">User Email <br></br> <span className="font-bold text-blue-700">{UserData.email}</span> </h1>
            <br></br>
            <h1 className="text-2xl text-black font-semibold">User Contact number <br></br>   <span className="font-bold text-blue-700">{UserData.phoneNumber} </span></h1>
          </div>
          :
          <div>
            <h1 className="text-center text-4xl font-bold">Login in see the magic</h1>
          </div>}

      </div>

    </>
  )
}
export default Temp;