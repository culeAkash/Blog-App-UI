import React,{useState,useEffect,useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LoginContext } from '../Context/login-context';
import { getCurrentUserDetails } from '../Auth/auth';

export default function Header() {
  const context = useContext(LoginContext);

  const user = context.user;

    
//give logic for login and logout button toggle


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-2">
      <div className="container-fluid">
        <Link className="navbar-brand text-uppercase" to="/">Blog App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className='navbar-nav mb-2 mb-lg-0 text-uppercase'>
          <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">News Feed</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          {context.isLogin && <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item">
              <Link className="nav-link" to='/user/info'>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/user/'>{user.name}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          </ul>}
          {!context.isLogin && <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">SignUp</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>}
          
        </div>
      </div>
    </nav>
  )
}

