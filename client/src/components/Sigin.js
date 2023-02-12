import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signin = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "", name: "", phoneNumber: "", password: "", confPassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { email, name, phoneNumber, password, confPassword } = user;
        const res = await fetch("/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, name, phoneNumber, password, confPassword
            })
        })
        const Data = await res.json();
        if (Data.status === 422 || !Data) {
            window.alert("invalid");
            console.log("invalid");
        } else {
            window.alert("success");
            console.log("success");

            history.push("/Login")
        }
    }

    return (
        <div className='bg-gray-100 p-10'>

            <section class=" bg-gray-100 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 lg:mt-12 ">

                    <div class="w-full   bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md ">
                        <div class="space-y-2 md:space-y-6 sm:p-8  ">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form class="space-y-4 md:space-y-6 " method="POST">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={user.email} onChange={handleInputs} placeholder="name@company.com" required="" />
                                </div>

                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={user.name} onChange={handleInputs} placeholder="eg:john.." required="" />
                                </div>

                                <div>
                                    <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your number</label>
                                    <input type="Text" name="phoneNumber" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={user.phoneNumber} onChange={handleInputs} placeholder="eg:854125..." required="" />
                                </div>

                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={user.password} onChange={handleInputs} required="" />
                                </div>
                                <div>
                                    <label for="confPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confPassword" id="confPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={user.confPassword} onChange={handleInputs} required="" />
                                </div>

                                <div>
                                    <button type="submit" class="w-full text-white bg-blue-400 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600" onClick={PostData}>Create an account</button>
                                </div>

                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href='./Login' class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Signin;