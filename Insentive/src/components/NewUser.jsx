import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);





function generateUnique4DigitNumber(usedNumbers) {
    let randomNumber;

    do {
        // Generate a random number between 1000 and 9999
        randomNumber = Math.floor(Math.random() * 9000) + 1000;
    } while (usedNumbers.includes(randomNumber)); // Check if the number is already used

    // Return the unique 4-digit number
    return randomNumber;
}

// Example usage:
const usedNumbers = []; // Array to store used numbers
const uniqueNumber = generateUnique4DigitNumber(usedNumbers);
usedNumbers.push(uniqueNumber); // Store the used number
console.log(uniqueNumber);








    const submit = (e) => {
        e.preventDefault();
        
        if (password !== rePassword) {
            setError('Passwords do not match');
            return;
        }

        let data = { name, email, password,userId:uniqueNumber };

        axios.post(`http://localhost:3000/userRegister`, data)
            .then((res) => {
                console.log("User Post Successful");
                setName('');
                setEmail('');
                setPassword('');
                setRepassword('');
                setError('');
                setRegistrationSuccess(true);
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred during registration');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">Register as New User</h2>
                    {registrationSuccess && (
                        <p className="text-green-500 text-center mb-4">Registration successful! You can now <Link to="/">login</Link>.</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="mt-8 space-y-6" onSubmit={submit}>
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
                        <p className="text-gray-800"><Link to='/'>Already registered? Login here</Link></p>
                        <div className="flex items-center justify-center">
                            <button
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

export default NewUser;
