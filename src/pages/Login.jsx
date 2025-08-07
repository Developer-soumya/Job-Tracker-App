import { IoGlasses } from "react-icons/io5";
import { MdLightbulbOutline } from "react-icons/md";
import { SiPivotaltracker } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { FaMagic } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'applicant',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form Submitted:', formData);
        // Add authentication logic here

        if (formData) {

            if (formData.role === "recruiter") {
                const adminList = JSON.parse(localStorage.getItem("adminList"))
                // console.log("adminList",adminList)

                const adminExistsByEmail = adminList.some(admin => admin.email === formData.email);
                // console.log("adminExist",adminExists)

                if (adminExistsByEmail) {
                    const adminExistsByPassword = adminList.some(admin => admin.password === formData.password);
                    if (adminExistsByPassword) {
                        alert("Admin Login Success")
                        localStorage.setItem("Role", formData.role);
                        localStorage.setItem("loginAdmin", JSON.stringify(adminList.find((data)=>data.email===formData.email)));
                        navigate("/admindashboard")
                        // Redirect to admin dashboard
                    } else {
                        alert("Invalid Password")
                    }
                } else {
                    alert("Invalid Email")
                }
                
            } else if (formData.role === "applicant") {
                
                const userList = JSON.parse(localStorage.getItem("userList"))
                const userExistsByEmail = userList.some(user => user.email === formData.email);
                // console.log("userExist",userExists)
                
                if (userExistsByEmail) {
                    const userExistsByPassword = userList.some(user => user.password === formData.password);
                    if (userExistsByPassword) {
                        localStorage.removeItem("Role");
                        alert("user Login Success")
                        // Redirect to admin dashboard
                        localStorage.setItem("loginUser", JSON.stringify(userList.find((data)=>data.email===formData.email)));
                        navigate("/userdashboard")
                    } else {
                        alert("Invalid Password")
                    }
                } else {
                    alert("Invalid Email")
                }

            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden ">

            {/* Background image with blur */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80')",
                }}
            >
                <div className="w-full h-full bg-opacity-40 backdrop-blur-[6px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col md:flex-row max-w-5xl w-full shadow-2xl rounded-xl overflow-hidden bg-white bg-opacity-90 backdrop-blur-md">

                {/* Left Box */}
                <div
                    className="md:w-1/2 w-full text-white flex flex-col items-center justify-center p-8 space-y-6"
                >
                    <div className="bg-black bg-opacity-60 p-6 rounded-lg text-center w-full h-full">
                        <div className="text-5xl mb-4 sm:flex sm:justify-center sm:gap-5 max-md:flex max-md:flex-col">
                            <IoGlasses className="text-[55px] max-md:ml-22" />
                            <p className="max-md:hidden">|</p>
                            <h1 className="text-3xl font-bold mt-3">Job Tracker</h1>
                        </div>
                        <div className="text-gray-200 flex flex-col sm:text-start sm:ml-17 space-y-3.5 max-md:hidden">
                            <p className="text-2xl">
                                <MdLightbulbOutline className="inline text-3xl text-amber-600 mr-3" />Job Suggestions</p>
                            <p className="text-2xl">
                                <SiPivotaltracker className="inline text-3xl text-amber-600 mr-3" />Application Tracker</p>
                            <p className="text-2xl"><FaMagic className="inline text-3xl text-amber-600 mr-3" />Cover Letter Generator</p>
                            <p className="text-2xl">
                                <IoIosColorPalette className="inline text-3xl text-amber-600 mr-3" />Dynamic CV Generation</p>
                        </div>
                    </div>
                </div>

                {/* Right Box - Login Form */}
                <div className="md:w-1/2 w-full p-8 bg-white">
                    <h2 className="text-2xl font-bold text-center text-[#203A43] mb-6">
                        Login to Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block font-semibold text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block font-semibold text-gray-700">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <p className="font-semibold text-gray-700 mb-1">Login as:</p>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="applicant"
                                        checked={formData.role === 'applicant'}
                                        onChange={handleChange}
                                    />
                                    <span>Applicant</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={formData.role === 'recruiter'}
                                        onChange={handleChange}
                                    />
                                    <span>Recruiter</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#203A43] text-white py-2 rounded-lg font-semibold hover:bg-[#2C5364] transition"
                        >
                            Login
                        </button>
                    </form>
                    <p>If you have no account ? <Link to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
