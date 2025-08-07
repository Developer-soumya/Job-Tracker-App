import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import AdminDashboard from '../pages/AdminDashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserDashboard from '../pages/UserDashboard'
import IsAdmin from '../validation/IsAdmin'
import JobDetails from '../pages/JobDetails'

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/admindashboard' element={<IsAdmin><AdminDashboard/></IsAdmin>}></Route>
        <Route path='/userdashboard' element={<UserDashboard/>}></Route>
        <Route path='/jobdetail/:id' element={<JobDetails/>}></Route>
      </Routes>
    </div>
  )
}

export default AllRoute
