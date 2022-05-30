import FetchService from "../../service/FetchService";
import React, { useState } from "react";
import { POST, REGISTRATION_URL } from "../../constants/FetchConstants";
import { useUserContext
 } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
function Registration(){
    const navigate = useNavigate();
    const[userName,setUserName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[disabled,setDisabled] = useState(true);
    const[error,setError] = useState("");

    const{user,setUser} = useUserContext();

    const handleSubmit = (e)=>{
        setError("");
        FetchService.fetchNoAuth(JSON.stringify({
            "username":userName,
            "email":email,
            "password":password
        }),REGISTRATION_URL,POST,login,setErrorMessage);
        setUserName("");
        setEmail("");
        setPassword("");
        setDisabled(true)
    }

    const login = (userDto) =>{
        setUser(userDto)
        navigate("/loginCompleated");
    }

    const setErrorMessage = (message) =>{
        setError(message);
    }

    const handleChangeUserName = (e) =>{
        setUserName(e.target.value);
        manageDisabled();
    }
    const handleChangeEmail = (e) =>{
        setEmail(e.target.value);
        manageDisabled();
    }
    const handleChangePassword = (e) =>{
        setPassword(e.target.value);
        manageDisabled();
    }

    const manageDisabled = () =>{
        if(userName.length > 0 && email.length > 0 && password.length > 0){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }

    return(
        <div className="component" id="registration">
            <div className="error">{error}</div>
            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="username" value={userName} onChange={handleChangeUserName}/><br/>
                <label htmlFor="email">Email</label><br/>
                <input type="text" id="email" value={email} onChange={handleChangeEmail}/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" value={password} onChange={handleChangePassword}/><br/>
            </form>
            <button onClick={handleSubmit} disabled={disabled}>Create account</button>
        </div>
    )
}

export default Registration;