import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const IsAdmin = ({ children }) => {

    const navigate = useNavigate()

    const role=localStorage.getItem("Role")

    useEffect(() => {

        if (role !== "recruiter" || role == null) {
            navigate("/login")
        }

    }, [role])
    return (
        <div>
            {children}
        </div>
    )
}

export default IsAdmin
