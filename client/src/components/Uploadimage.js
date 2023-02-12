import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";



const Uploadimage = () => {

    const history = useHistory();
    const [image, setImage] = useState('')

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.files);

        setImage(e.target.files[0]);
    }

    // const handleApi = () => {

    //     const url = "http://localhost:8000/upload"
    //     const formData = new FormData()
    //     formData.append('testimage', image)
    //     axios.post(url, formData, {
    //         headers: {
    //             // Multer only parses "multipart/form-data" requests
    //             'Content-Type': 'multipart/form-data',
    //             Accept: 'application/json'
    //         },
    //     }).then((res) => {
    //         console.log(res.data);
    //         window.alert("Image Saved....")
    //     }).catch((err) => {
    //         console.log(err);
    //     })

    // }


    // get method
    const [images, setImages] = useState([]);
    

    useEffect(() => {
        fetch(`/images`)
            .then(res => res.json())
            .then(data => {
               // setImages(data.map(img => URL.createObjectURL(new Blob([img], { type: 'image/png' }))));
               setImages(data)
            });
    }, []);
    const PostDetails = () => {
        const data = new FormData();
        
        data.append("file", image);
        data.append("upload_preset", "nizamshan");
        data.append("cloud_name", "druq3xl0i");
        fetch("https://api.cloudinary.com/v1_1/druq3xl0i/image/upload",  {

          method: "POST",
          mode: "no-cors",
          body: data,
        })
          .then(res => res.JSON())
          
          .then((data) => {
            setImage(data.image);
            console.log(data);
    
          })
          .catch((err) => {
            console.log(err);
          });
      };


    return (

        <>

            <div className="bg-red-200 h-screen">
                <div className=" flex pt-28 pb-6">
                    <input type="file" className="ml-80" id="fileupload"onChange={handleChange} />

                    <button type="submit" onClick={PostDetails} className="inline-block px-7 py-3 ml-56 bg-blue-600 text-white font-medium text-sm" >submit</button>
                    {/* <img
                        src={image}
                    /> */}
                </div>
                <hr className="pt-12"></hr>
                <div>
                    <div>
                        <h1 className="text-center text-4xl font-semibold text-red-600">Your uploaded pictures are.....</h1>
                    </div>
                </div>
                <div className="  py-6 grid grid-cols-4 ">
                    {images.map((image) => (
                        <div className=" px-10 ">
                            <img src={image}  alt="My Image" className="p-5 " />
                        </div>
                    ))}
                </div>

            </div>


        </>
    )
}

export default Uploadimage;