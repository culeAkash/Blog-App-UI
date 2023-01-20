import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authenticate } from '../../Auth/auth'
import Dashboard from './Dashboard'
import ProfileInfo from './ProfileInfo'
export default function User() {


    if(!authenticate()){
        return <Navigate to="/login" replace/>
    }


  return (
    <React.Fragment>

    <Routes>
        <Route path='/' element={<Navigate to='dashboard' replace/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/info' element={<ProfileInfo/>}/>
      </Routes>
    </React.Fragment>
  )
}
