import { useEffect, useState } from "react";
import { useCategoryContext } from "../../context/GlobalContext";
import { InputFields } from "./InputFields";

function ExerciseInput(){

    const[exerciseName,setExerciseName] = useState();

    const{categorys,setCategorys} = useCategoryContext();
    const[exercises,setExercises] = useState([]);
    const[list,setList] = useState([]);
    const[selected,setSelected] = useState(null)

    useEffect(()=>{
        if(categorys === null){
            return
        }
        if(categorys === undefined){
            return
        }
        let temp = []
        for(let i = 0; i<categorys.length;i++){
            for(let k = 0; k < categorys[i].exerciseDTOs.length;k++){
                temp.push(categorys[i].exerciseDTOs[k])
            }
        }
        setExercises(temp)
    },[categorys])

    const exerciseNameChangeClick = (e) =>{
        setSelected(null)
        setExerciseName(e.target.value)
        exerciseNameChange(e.target.value)
    }

    const exerciseNameChange = (name) =>{
        setList([])
        if(name === ""){
            return
        }
        let temp = [];
        for(let i = 0; i< exercises.length;i++){
            if(exercises[i].name.toLowerCase().includes(name.toLowerCase())){
                temp.push(exercises[i])
            }
        }
        setList(temp)
    }

    const exerciseOnClick = (e) =>{
        let a = e.target.attributes.getNamedItem("index").value
        setExerciseName(list[a].name)
        exerciseNameChange(list[a].name)
        setSelected(list[a])
    }

    const hasSelected = () =>{
        if(selected !== null){
            return true
        }
        return false
    }

    return(
        <div className="myinput">
            <div className="inputfield">
            <label>Exercise </label>
            <input type="text" value={exerciseName} on onChange={exerciseNameChangeClick}></input>
            </div>
            {
                list.map((row,index)=>{
                    return(
                        <div className="listitem" key={index} index={index} onClick={exerciseOnClick}>{row.name}</div>
                    )
                })
            }
            {
            hasSelected() ? 
                <div className="inputfields">
                    <InputFields exercise={selected}/>
                </div> 
                :
                <div>
                    <p className="inputtext">Start typing the name of an exercise then click on the one you are looking for</p>
                </div>
            }
            
        </div>
    )
}

export default ExerciseInput