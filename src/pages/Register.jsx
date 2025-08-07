import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: Date.now(),
        firstName: '',
        lastName: '',
        age: '',
        dob: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        profession: '',
    });

    const [adminList, setAdminList] = useState([{
        id: 1,
        "firstName": "admin",
        "lastName": "part",
        "age": 25,
        "dob": "1997-01-01",
        "email": "admin@gmail.com",
        "password": "admin123",
        "phone": "1234567890",
        "gender": "Male",
        "profession": "recruiter",

    }]);
    const [userList, setUserList] = useState([{
        id: 1,
        "firstName": "user",
        "lastName": "part",
        "age": 25,
        "dob": "1997-01-01",
        "email": "user@gmail.com",
        "password": "user123",
        "phone": "1234567890",
        "gender": "Male",
        "profession": "applicant",

    }]);

    // console.log(userList)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData) {

            if (formData.profession === "recruiter") {

                const adminExists = adminList.some(admin => admin.email === formData.email);
                if (adminExists) {
                    alert("admin alredy exist")
                    return;
                }

                const updatedAdminList = [...adminList, formData];
                setAdminList(updatedAdminList);

                alert("admin Data saved");

                // console.log(updatedAdminList)
            } else if (formData.profession === "applicant") {

                const userExists = userList.some(user => user.email === formData.email);
                if (userExists) {
                    alert("user alredy exist")
                    return;
                }

                const updatedUserList = [...userList, formData];
                setUserList(updatedUserList);
                alert("User Data saved");
            }

        } else {
            alert('Please fill all the fields')
        }

        navigate("/login")

    };

    localStorage.setItem("adminList", JSON.stringify(adminList))
    localStorage.setItem("userList", JSON.stringify(userList))

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            {/* Blurred Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80')",
                    zIndex: 0,
                }}
            ></div>

            {/* Overlay (optional: for contrast) */}
            <div className="absolute inset-0 bg-opacity-40 backdrop-blur-[3px] z-0"></div>

            {/* Registration Form */}
            <div className="relative z-10 bg-white shadow-xl p-8 rounded-lg max-w-2xl w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Register</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block font-semibold text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Profession</label>
                        <select
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="applicant">Applicant</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-[#203A43] hover:bg-[#2C5364] text-white py-2 rounded-md font-semibold transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className='text-center mt-5'>
                    <Link to='/login' className='text-sm text-gray-800'>If you have already account <span className='underline'>Login</span></Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
