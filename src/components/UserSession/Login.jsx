import FetchService from "../../service/FetchService";
import React, { useState } from "react";
import LinkToRegister from "../LinkToRegister";
import { LOGIN_URL, POST } from "../../constants/FetchConstants";
import { useUserContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { LS_user } from "../../constants/LocalStorageKeys";

function Login(){
    const navigate = useNavigate();
    const[emailOrUsername,setEmailOrUsername] = useState("");
    const[password,setPassword] = useState("");
    const[disabled,setDisabled] = useState(true);
    const[error,setError] = useState("");

    const{user,setUser} = useUserContext();
    

    const handleSubmit = (e)=>{
        setError("");
        FetchService.fetchNoAuth(JSON.stringify({
            "emailOrUsername":emailOrUsername,
            "password":password
        }),LOGIN_URL,POST,login,setErrorMessage)
        setEmailOrUsername("");
        setPassword("");
        setDisabled(true)
    }

    const login = (userDto) =>{
        setUser(userDto)
        localStorage.setItem(LS_user,JSON.stringify(userDto))
        navigate("/loginCompleated");
    }

    const setErrorMessage = (message) =>{
        setError(message);
    }

    const handleChangeUserName = (e) =>{
        setEmailOrUsername(e.target.value);
        manageDisabled();
    }
    const handleChangePassword = (e) =>{
        setPassword(e.target.value);
        manageDisabled();
    }

    const manageDisabled = () =>{
        if(emailOrUsername.length > 0 && password.length > 0){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }

    return(
        <div className="component" id="login">
            <div className="error">{error}</div>
            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="username" value={emailOrUsername} onChange={handleChangeUserName}/><br/>

                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" value={password} onChange={handleChangePassword}/><br/>
            </form>
            <button onClick={handleSubmit} disabled={disabled}>Login</button>
            <LinkToRegister/>
        </div>
    )
}

export default Login;