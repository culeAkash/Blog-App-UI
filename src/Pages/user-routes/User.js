import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authenticate } from '../../Auth/auth'
import Dashboard from './Dashboard'
export default function User() {


    if(!authenticate()){
        return <Navigate to="/login" replace/>
    }


  return (
    <div>
      User is logged in

    <Routes>
        <Route path='/' element={<Navigate to='dashboard' replace/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}
