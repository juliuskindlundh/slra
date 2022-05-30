import { CATEGORY, FINDALLBYUSERID, GET } from "../../constants/FetchConstants";
import { useCategoryContext, useExerciseContext, useUserContext } from "../../context/GlobalContext"
import { useState,useEffect } from "react";
import FetchService from "../../service/FetchService"
import { LS_user } from "../../constants/LocalStorageKeys";
import TreeRoot from "./Tree";
import { doNothing } from "../../Util";

export function ExerciseList(){

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

    const[root,setRoot] = useState()

    useEffect(()=>{
        if(categorys === undefined){
            return;
        }
        if(categorys === null){
            return;
        }
        for(let i = 0; i< categorys.length;i++){
            if(categorys[i].name === "DEFAULT"){
                setRoot(categorys[i]);
                return
            }
        }
    },[categorys])

    return(
        root ?
        <TreeRoot root={root}/>
        :
        <div>
            loading...
        </div>
    )
}