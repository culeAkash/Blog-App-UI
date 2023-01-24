//isLogin=> to check if the localstorage contains details of the loggedin user
export const authenticate = () => {
    const data = localStorage.getItem('loginUserData');

    if (data === null)
        return false;
    return true;
}


//doLogin => set the token to the local storage once successful token comes from server
//if we want to execute something after login then give it in place of callback as function
export const doLogin = (loginData,callback) => {
    localStorage.setItem('loginUserData', JSON.stringify(loginData));
    callback();
}


//doLogout => log out and remove token from local storage
export const doLogOut = (callback)=>{
    localStorage.removeItem('loginUserData');
    callback();
}


//getCurrent user
export const getCurrentUserDetails = ()=>{
    if(authenticate()){
        return JSON.parse(localStorage.getItem('loginUserData')).user;
    }
    return null;
}


export const getJWTToken = ()=>{
    if(authenticate()){
        return JSON.parse(localStorage.getItem('loginUserData')).token;
    }
    return null;
}