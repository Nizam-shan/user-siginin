import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // usehistory to render another page

const Home = () => {
  const [userName, setUserName] = useState();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const callHomePage = async () => {
    console.log("homepage")
    try {
      const res = await fetch('/Home ', {
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

      if (data) {
        setShow(true);
        console.log("success");
        setUserName(data.name);

      } else {
        history.push('/Login');
      }



      //  if(!res.status===200){
      //   // const error = new Error(res.error);
      //   // throw error;
      //   console.log("error");
      //  }

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    callHomePage();

  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 w-auto h-screen relative">

        <div className="container absolute">
          <div className="text-center pt-56">
            <p className="text-xl"> WELLCOME.....</p>
            <br></br>
            <h1 className="text-4xl font-bold text-white uppercase">{userName}</h1>
            <br></br>
            <h1 className="text-4xl font-semibold">{
              show ? 'Happy ,to see you back'
                : 'WE ARE MERN DEVELOPER'
            }</h1>

          </div>

        </div>
      </div>
    </>
  )

};

export default Home;
