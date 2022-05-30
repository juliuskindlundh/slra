import { useEffect, useState } from "react";
import { useUserContext } from "../../context/GlobalContext";
import NavbarLink from "./NavbarLink"
function Topbar(){
    const{user,setUser} = useUserContext();
    const[loaded,setLoaded] = useState(false)

    useEffect(()=>{
        if(user !== null){
            if(user !== undefined){
                if(user.userDTO !== undefined){
                    setLoaded(true)
                    return
                }
            }
        }
        setLoaded(false)
    },[user])

    return(
        <div>
        {
        loaded ?
            <div className="component" id="topbar">
            <h1>{"Logged in as "+user.userDTO.username}</h1>
                <div>
                    <NavbarLink link="/logout" linkName="Logout"></NavbarLink>
                </div>
            </div> 
            :
            <div className="component" id="topbar">
                <h1>Login or register</h1>
                <div>
                    <NavbarLink link="/login" linkName="Login"></NavbarLink>
                    <NavbarLink link="/registration" linkName="Register"></NavbarLink>
                </div>
            </div>
        }
        </div>
    );
}
export default Topbar;