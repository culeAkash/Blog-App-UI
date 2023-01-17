import React,{useContext} from 'react';
import { LoginContext } from '../Context/login-context';
import { doLogOut } from '../Auth/auth';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const context = useContext(LoginContext);
    doLogOut(()=>{
        console.log("user is logged out");
    });

    context.toggleLogin();


    return (
        <Navigate to="/login" replace/>
    );
}

export default Logout;
