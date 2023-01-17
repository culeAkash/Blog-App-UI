import React,{useState,useEffect} from "react"
import { authenticate , getCurrentUserDetails} from "../Auth/auth";

export const LoginContext = React.createContext({});

const LoginContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    

    const toggleLoginHandler = ()=>{
        setIsLogin(authenticate());
    }

    const user = getCurrentUserDetails();
    

    return (
        <LoginContext.Provider value={{isLogin : isLogin,toggleLogin : toggleLoginHandler,user : user}}>
            {props.children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;
