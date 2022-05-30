import { useState,useEffect } from "react";
import { BASE_URL, CATEGORY, CREATE, DELETE, DELETE_HTTP, EXERSICE, POST, PUT, UPDATE } from "../../constants/FetchConstants";
import { LS_user } from "../../constants/LocalStorageKeys";
import { useCategoryContext, useSelectedContext, useUserContext } from "../../context/GlobalContext";
import FetchService from "../../service/FetchService"
import { doNothing, isCategory, reload } from "../../Util";

export function CategoryEditor(){

    const[categoryName,setCategoryName] = useState("");
    const{selected,setSelected} = useSelectedContext();
    const{user,setUser} = useUserContext();
    const{categorys,setCategorys} = useCategoryContext();
    const categoryNameOnchange = (e) =>{
        setCategoryName(e.target.value);
    }

    useEffect(()=>{
        if(selected === null){
            return
        }
        if(selected === undefined){
            return
        }
        if(selected.inputFields === undefined){
            setCategoryName(selected.name)
        }
    },[selected])

    const handleCreateOnClick = () =>{
        let object = {
           "name":categoryName,
           "userId":user.userDTO.id 
        }
        FetchService.fetch(JSON.stringify(object),CATEGORY+CREATE,POST,user.jwt,reload,doNothing)
    }
    const handleUpdateOnClick = () =>{
        let object = selected
        object.name = categoryName;
        FetchService.fetch(JSON.stringify(object),CATEGORY+UPDATE,PUT,user.jwt,reload,doNothing)
    }
    
    const handleDeleteOnClick = () =>{
        FetchService.fetch(null,CATEGORY+DELETE+selected.id,DELETE_HTTP,user.jwt,reload,doNothing)
    }

    const deleted = () =>{
        setSelected(null)
    }

    const handleClearOnClick = () =>{
        setSelected(null)
        setCategoryName("")
    }

    let clear = "Clear";
    let unselect = "Unselect"
    const[clearUnselect,setClearUnselect] = useState(clear)
    
    useEffect(()=>{
        shouldDeleteBeDisabeld()
        shouldUpdateBeDisabeld()
        if(selected !== undefined){
            if(selected !== null){
                setClearUnselect(unselect)
                return
            }
        }
        setClearUnselect(clear)
    },[selected])

    const[createDisable,setCreateDisable] = useState(true);
    const[updateDisable,setUpdateDisable] = useState(true);
    const[deleteDisable,setDeleteDisable] = useState(true);

    useEffect(()=>{
        shouldCreateBeDisabeld()
    },[categoryName])

    const shouldCreateBeDisabeld = () =>{
        if(selected === null && categoryName.length > 0){
            setCreateDisable(false)
            return
        }
        setCreateDisable(true)
    }

    const shouldUpdateBeDisabeld = () =>{
        if(categoryName.length > 0){
            setUpdateDisable(!isCategory(selected))
            return
        }
        setUpdateDisable(true)       
    }

    const shouldDeleteBeDisabeld = () =>{
        setDeleteDisable(!isCategory(selected))
    }

    return(
        <div className="categoryeditor">
            <br></br>
            <label>Category name</label>
            <input type="text" value={categoryName} onChange={categoryNameOnchange}/>
            <div>
            <button disabled={createDisable} onClick={handleCreateOnClick}>Create</button>
            <button disabled={updateDisable} onClick={handleUpdateOnClick}>Update</button>
            <button disabled={deleteDisable} onClick={handleDeleteOnClick}>Delete</button>
            <button onClick={handleClearOnClick}>{clearUnselect}</button>
            </div>
        </div>
    )
}

