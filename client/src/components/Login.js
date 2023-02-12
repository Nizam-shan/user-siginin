import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUesr = async (e) => {
        e.preventDefault();
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();

        if (data.status == 422 || !data) {
            window.alert("not success");
        }
        else {
            window.alert("success");
            history.push('/Home');
        }

    }

    return (
        <>

            <section class="h-screen bg-gray-200">
                <div class="container px-6 py-12 h-full">
                    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 px-24">
                        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                class="w-full"
                                alt="bg"
                            />
                        </div>
                        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <h1 className='px-8 text-4xl font-semibold py-5'>Enter Through me...</h1>
                            <form method='POST'>
                                <div class="mb-6">
                                    <input
                                        type="text"
                                        class="email form-control block w-96 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id='email' name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                    />
                                </div>


                                <div class="mb-6">
                                    <input
                                        type="password"
                                        class="form-control block w-96 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id='password' name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                </div>

                                <div class="flex justify-between items-center mb-6">
                                    <a href='./Sigin'> Have An account Signin</a>
                                </div>

                                <button
                                    type="submit"
                                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-96"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    onClick={loginUesr}
                                >Sigin In</button>


                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login;