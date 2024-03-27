import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function NewAdmin() {
    const [name,setName]=useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword]=useState('')
    const [rePassword,setRepassword]=useState('')




    const submit=(e)=>{
        e.preventDefault();

        let data={
            name,
            email,
            password,
            rePassword
        }

        axios.post(`http://localhost:3000/adminRegister`,data)
        .then((res)=>{
            console.log("Admin Post SucessFul");
        })
        .catch((Error)=>{
            console.log(Error);
        })

    }








    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">Register as New Admin</h2>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-800 text-sm font-bold mb-2">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email address"
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="rePassword" className="block text-gray-700 text-sm font-bold mb-2">Re-enter Password</label>
                            <input
                                id="rePassword"
                                name="rePassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Re-enter Password"
                                value={rePassword}
                                onChange={(e)=>{setRepassword(e.target.value)}}
                            />
                        </div>
                        <p className='text-gray-800'><Link to='/'>Already register</Link></p>
                        <div className="flex items-center justify-center">
                            <button onClick={submit}
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewAdmin;
