import React, { useState } from 'react';
import { User, Mail, Lock, Loader } from 'lucide-react';
import authservice from '../Appwrite/authFunctions';
import { useNavigate } from 'react-router-dom';
const Signup = () => {





    const Navigate = useNavigate();

    const [Name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSignUpFunction(e) {
        e.preventDefault();
        if (Name == "" || email == "" || password == "" || confirm == "") {
            setError("All feilds are required!");
        }
        else if (password !== confirm) {
            setError("Password and Confirm Passwords are not match");
        }
        else if(password.length<8){
            setError("Password must be of 8 character");
        }
        else {
            setError("");
            setLoading(true);
            let data = await authservice.create_A_NEW_USER(Name, email,password)
            if(data.success){
                Navigate("/login")
            }
            else{
                setLoading(false);
                setError(data.error)
            }
        }

    }
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
            <p className='text-xl text-center p-6 text-red-700'>{error}</p>
            <form onSubmit={handleSignUpFunction}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <div className="flex items-center border rounded-md">
                        <User className="w-5 h-5 text-gray-400 mx-2" />
                        <input
                            value={Name}
                            onChange={(e) => { setName(e.target.value) }}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-2 border-none focus:ring-0"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <div className="flex items-center border rounded-md">
                        <Mail className="w-5 h-5 text-gray-400 mx-2" />
                        <input
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border-none focus:ring-0"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <div className="flex items-center border rounded-md">
                        <Lock className="w-5 h-5 text-gray-400 mx-2" />
                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border-none focus:ring-0"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <div className="flex items-center border rounded-md">
                        <Lock className="w-5 h-5 text-gray-400 mx-2" />
                        <input
                            value={confirm}
                            onChange={(e) => { setConfirm(e.target.value) }}
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full p-2 border-none focus:ring-0"
                        />
                    </div>
                </div>


                {
                    loading ? (<div className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center">
                        <Loader />
                    </div>)
                        :
                        (<button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Sign Up
                        </button>)
                }


            </form>
        </div>
    );
};

export default Signup;
