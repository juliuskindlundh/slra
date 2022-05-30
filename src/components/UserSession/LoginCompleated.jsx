import { useEffect, useState } from "react";
import { CATEGORY, FINDALLBYUSERID, GET } from "../../constants/FetchConstants";
import { LS_user } from "../../constants/LocalStorageKeys";
import { useCategoryContext, useUserContext } from "../../context/GlobalContext";
import FetchService from "../../service/FetchService";
import { doNothing, isNull } from "../../Util";

function LoginCompleated(){
    const{categorys,setCategorys} = useCategoryContext();
    const{user,setUser} = useUserContext();
    const[doFetch,setDoFetch] = useState(false)
    useEffect(()=>{
        setTimeout(function(){
            if(user === undefined){
                setUser(JSON.parse(localStorage.getItem(LS_user)))
            }
            setTimeout(function(){
                setDoFetch(!doFetch)
            },500)
        },500)
    },[])

    useEffect(()=>{
        if(user !== undefined){
            FetchService.fetch(null,CATEGORY+FINDALLBYUSERID+user.userDTO.id,GET,user.jwt,setCategorys,doNothing)
        }
    },[doFetch])

    return(
        isNull(user) ?
        <div>Logging in...</div>
        :
        <div>Logged in</div>
    )
}

export default LoginCompleated;