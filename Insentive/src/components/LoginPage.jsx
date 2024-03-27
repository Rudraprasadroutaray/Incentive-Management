import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = (e, endpoint, userType) => {
        e.preventDefault();
        let data = {
            email,
            password
        };

        axios.post(`http://localhost:3000/${endpoint}`, data)
            .then((res) => {
                const token = res.data.token;
                localStorage.setItem('token', token);
                console.log(res.data);
                if (res.status === 200) {
                    setTimeout(()=>{

                    
                    navigate(userType === 'admin' ? '/Empform' : '/insentiveDisp');
                },900)
                    showToast(`Login successful as ${userType}`);
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                showToast('Login failed');
            });
    };

    const showToast = (message) => {
        toast(message, { position: "top-center", autoClose: 3000, hideProgressBar: false });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700 py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8  ">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Log in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-100 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mb-4  appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-100 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p>Forgot Password</p>
                    </div>

                    <div>
                        <button onClick={(e) => login(e, 'adminlogin', 'admin')}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log in as Admin
                        </button>
                        <button onClick={(e) => login(e, 'userlogin', 'user')}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                        >
                            Log in as User
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center flex pr-5">
                    {/* <p className="text-gray-100 pr-5 pl-32"><Link to='/newadmin'>new Admin?</Link></p> */}
                    <p className="text-gray-100"><Link to='/newuser'>new User?</Link></p>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default LoginPage;
