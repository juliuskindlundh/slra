import { useState,useEffect } from "react";
import { BASE_URL, CREATE, EXERSICE, POST, UPDATE,PUT } from "../../constants/FetchConstants";
import { LS_user } from "../../constants/LocalStorageKeys";
import { useSelectedContext, useUserContext } from "../../context/GlobalContext";
import FetchService from "../../service/FetchService"
import { doNothing, reload } from "../../Util";

export function ExerciseEditor(){

    const[exerciseName,setExerciseName] = useState("");
    const exerciseNameOnchange = (e) =>{
        setExerciseName(e.target.value);
    }

    const[H,setH]=useState(false);
    const HOnChnage = (e) =>{
        setH(e.target.checked);
        let temp = activeInputFields
        temp[0] = e.target.checked
        setActiveInputFields(temp);
        
    }
    const[KG,setKG]=useState(false);
    const KGOnChnage = (e) =>{
        setKG(e.target.checked);
        let temp = activeInputFields
        temp[1] = e.target.checked
        setActiveInputFields(temp);
    }
    const[KM,setKM]=useState(false);
    const KMOnChnage = (e) =>{
        setKM(e.target.checked);
        let temp = activeInputFields
        temp[2] = e.target.checked
        setActiveInputFields(temp);
    }
    const[M,setM]=useState(false);
    const MOnChnage = (e) =>{
        setM(e.target.checked);
        let temp = activeInputFields
        temp[3] = e.target.checked
        setActiveInputFields(temp);
    }
    const[MIN,setMIN]=useState(false);
    const MINOnChnage = (e) =>{
        setMIN(e.target.checked);
        let temp = activeInputFields
        temp[4] = e.target.checked
        setActiveInputFields(temp);
    }
    const[NUM,setNUM]=useState(false);
    const NUMOnChnage = (e) =>{
        setNUM(e.target.checked);
        let temp = activeInputFields
        temp[5] = e.target.checked
        setActiveInputFields(temp);
    }

    const[activeInputFields,setActiveInputFields] = useState();
    useEffect(()=>{
        let temp = [false,false,false,false,false,false]
        setActiveInputFields(temp)
        if(user === undefined){
            setUser(localStorage.getItem(LS_user))
        }
        clearUnselectClick()
    },[])

    const {selected,setSelected} = useSelectedContext();
    useEffect(()=>{
        if(selected === null){
            return
        }
        if(selected === undefined){
            return
        }
        if(selected.exerciseDTOs === undefined){
            setExerciseName(selected.name)
            setH(selected.inputFields.includes("H"))
            setKG(selected.inputFields.includes("KG"))
            setKM(selected.inputFields.includes("KM"))
            setM(selected.inputFields.includes("M"))
            setMIN(selected.inputFields.includes("MIN"))
            setNUM(selected.inputFields.includes("NUM"))
        }
    },[selected])
    
    const{user,setUser} = useUserContext();

    const[createDisabeld,setCreateDisabeld] = useState(true)
    const createClick = () =>{
        let temp = []
        if(activeInputFields[0]){
            temp.push("H")
        }
        if(activeInputFields[1]){
            temp.push("KG")
        }
        if(activeInputFields[2]){
            temp.push("KM")
        }
        if(activeInputFields[3]){
            temp.push("M")
        }
        if(activeInputFields[4]){
            temp.push("MIN")
        }
        if(activeInputFields[5]){
            temp.push("NUM")
        }
        const object = {
            "name":exerciseName,
            "inputFields":temp
        }
        FetchService.fetch(JSON.stringify(object),EXERSICE+CREATE,POST,user.jwt,reload,doNothing)
        clearUnselectClick()
    }

    const[updateDisabeld,setUpdateDisabeld] = useState(true)
    const updateClick = () =>{
        let temp = [];
        if(H){
            temp.push("H")
        }
        if(KG){
            temp.push("KG")
        }
        if(KM){
            temp.push("KM")
        }
        if(M){
            temp.push("M")
        }
        if(MIN){
            temp.push("MIN")
        }
        if(NUM){
            temp.push("NUM")
        }
        selected.name = exerciseName
        selected.inputFields = temp;
        FetchService.fetch(JSON.stringify(selected),EXERSICE+UPDATE,PUT,user.jwt,reload,doNothing)  
    }

    const[deleteDisabeld,setDeleteDisabeld] = useState(true)
    const deleteClick = () =>{
        
    }

    const clearUnselectClick = () =>{
        setSelected(null)
        setExerciseName("")
        setH(false)
        setKG(false)
        setKM(false)
        setM(false)
        setNUM(false)
        setMIN(false)
        let temp = [false,false,false,false,false,false]
        setActiveInputFields(temp)
    }

    const disable = () =>{
        shouldCreateBeDisabeld();
        shouldUpdateBeDisabeld();
        shouldDeleteBeDisabeld();
    }

    useEffect(()=>{
        disable()
    },[exerciseName,H,KG,KM,M,MIN,NUM])

    const shouldCreateBeDisabeld = () =>{
        if(selected !== null){
            setCreateDisabeld(true)
            return
        }
        if(exerciseName !== undefined){
            if(exerciseName.length !== 0){
                setCreateDisabeld(false)
                return
            }
        }
        setCreateDisabeld(true)
    }

    const shouldUpdateBeDisabeld = () =>{
        if(selected !== undefined){
            if(selected !== null){
                if(selected.inputFields){
                    if(exerciseName.length !== 0){
                        setUpdateDisabeld(false)
                        return
                    }
                    
                }
            }
        }
        setUpdateDisabeld(true);
    }

    const shouldDeleteBeDisabeld = () =>{
        if(selected !== undefined){
            if(selected !== null){
                if(selected.inputFieldIds){
                    setDeleteDisabeld(false)
                    return
                }
            }
        }
        setDeleteDisabeld(true);
    }

    let clear = "Clear";
    let unselect = "Unselect"
    const[clearUnselect,setClearUnselect] = useState(clear)
    
    useEffect(()=>{
        if(selected !== undefined){
            if(selected !== null){
                setClearUnselect(unselect)
                return
            }
        }
        setClearUnselect(clear)
    },[selected])

    return(
        <div className="exerciseinput">
            <label>Exercise name</label>
            <input type="text" value={exerciseName} onChange={exerciseNameOnchange}/>
            <br></br>
            <label>H</label>
            <input type="checkbox" checked={H} onChange={HOnChnage}/>
            <br></br>
            <label>KG</label>
            <input type="checkbox" checked={KG} onChange={KGOnChnage}/>
            <br></br>
            <label>KM</label>
            <input type="checkbox" checked={KM} onChange={KMOnChnage}/>
            <br></br>
            <label>M</label>
            <input type="checkbox" checked={M} onChange={MOnChnage}/>
            <br></br>
            <label>MIN</label>
            <input type="checkbox" checked={MIN} onChange={MINOnChnage}/>
            <br></br>
            <label>NUM</label>
            <input type="checkbox" checked={NUM} onChange={NUMOnChnage}/>
            <div className="buttons">
                <button disabled={createDisabeld} onClick={createClick}>Create</button>
                <button disabled={updateDisabeld} onClick={updateClick}>Update</button>
                <button disabled={deleteDisabeld} onClick={deleteClick}>Delete</button>
                <button onClick={clearUnselectClick}>{clearUnselect}</button>
            </div>
        </div>
    )
}