import { useEffect, useState } from "react"
import { BUFFEREDEXERCISE, CREATE, POST } from "../../constants/FetchConstants"
import { useUserContext } from "../../context/GlobalContext"
import FetchService from "../../service/FetchService"
import { doNothing } from "../../Util"

export function InputFields(props){

    const[list,setList] = useState([])

    useEffect(()=>{
        setList[props.exercise.inputFields]
    },[])

    const isLoaded = () =>{
        if(list.length > 0){
            return true
        }
        return false

    }

    const{user}=useUserContext()
    const handleSave = () =>{
        let input = document.getElementsByClassName("input")
        let temp = []
        for(let i = 0; i < input.length;i++){
            if(input[i].value === undefined){
                return
            }
            if(input[i].value.length === 0){
                return
            }
        }
        for(let i = 0; i < input.length;i++){
            temp.push(input[i].value)
            input[i].value = ""
        }

        let object = {
            "exerciseId":props.exercise.id,
            "dataValues":temp,            
        }
        FetchService.fetch(JSON.stringify(object),BUFFEREDEXERCISE+CREATE,POST,user.jwt,doNothing,doNothing)
    }

    return(
        <div>
            {
              props.exercise.inputFields.map((row,index)=>{
                return(
                    <div key={index}>
                        <InputField name={row}/>
                    </div>
                )
              })
            }
            <button className="inputbutton" onClick={handleSave}>Save</button>
        </div>
    )
}

export function InputField(props){
    return(
        <div className="inputfield">
            <label>{props.name}</label>
            <input type="text" className="input"></input>
        </div>

    )
}