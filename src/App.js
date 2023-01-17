import logo from './logo.svg';
import './App.css';
import React from 'react'
import Base from './Components/Base';
import { Routes, Route, Navigate } from 'react-router-dom'
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import User from './Pages/user-routes/User';
import LoginContextProvider from './Context/login-context';
import Logout from './Pages/Logout';
function App() {
  return (
    <LoginContextProvider>
      <Base>
      <ToastContainer position='bottom-center'/>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/user/*' element={<User/>}/>
          <Route path='/logout' element={<Logout/>}/>

        </Routes>
      </Base>

    </LoginContextProvider>

  );
}

export default App;
