import { useEffect, useState } from "react"
import { BUFFEREDEXERCISE, FINDALLBYUSERID, GET, PUT, SESSIONS } from "../../constants/FetchConstants"
import { LS_user } from "../../constants/LocalStorageKeys"
import { useUserContext } from "../../context/GlobalContext"
import FetchService from "../../service/FetchService"
import { doNothing, reload } from "../../Util"

export function Sessions(){

    const[bufferedExercises,setBufferedExercises] = useState([])
    const{user,setUser} = useUserContext()
    const[sessions,setSessions]=useState([])

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
        FetchService.fetch(null,BUFFEREDEXERCISE+FINDALLBYUSERID,GET,user.jwt,setBufferedExercises,doNothing)
        fetchSessions()
        }
    },[doFetch])

    const compileIntoSessionClick = () =>{
        FetchService.fetch(null,SESSIONS+"compileintosessions",PUT,user.jwt,fetchSessions(),doNothing)
    }

    const fetchSessions = () =>{
        FetchService.fetch(null,SESSIONS+FINDALLBYUSERID,GET,user.jwt,setSessions,doNothing)
    }

    return(
        <div>
            <h4>Compleated exercises</h4>
            {
                bufferedExercises.map((row,index)=>{
                    return(
                        <div key={index}> 
                            {row.exercise.name+" "}
                            {new Date(row.timeStamp).getFullYear() + "/" + new Date(row.timeStamp).getMonth()+"/"+new Date(row.timeStamp).getDate()}
                            {
                                row.dataValues.map((row1,index1)=>{
                                    return(
                                        <div key={index1}>
                                            {row1+" "+row.exercise.inputFields[index1]}
                                        </div>
                                    )
                                })
                            }              
                        </div>
                    )
                })
            }
            <button onClick={compileIntoSessionClick}>Compile into sessions</button>
            <h4>Sessions</h4>
            {
                sessions.map((row,index)=>{
                    let fc = new Date(row.fistCompletedExercise)
                    let lc = new Date(row.lastCompletedExercise)
                    return(
                        <div key={index}>
                            {fc.getFullYear()+"/"+fc.getMonth()+"/"+fc.getDate()+" "+fc.getHours()+":"+fc.getMinutes()+" to "}
                            {lc.getHours()+":"+lc.getMinutes()}
                            {
                                row.completedExercises.map((row1,index1)=>{
                                    return(
                                        <div key={index1} className="horizontal">
                                            {row1.exercise.name}
                                            {
                                                row1.dataDTOs.map((row2,index2)=>{
                                                    return(
                                                        <div key={index2} className="sessionInformation">
                                                            {row1.exercise.inputFields[index2]+":"+row2.value}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}