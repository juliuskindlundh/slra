import { CATEGORY, FINDALLBYUSERID, GET, PUT, UPDATE } from "../../constants/FetchConstants";
import { useCategoryContext, useSelectedContext, useUserContext } from "../../context/GlobalContext"
import FetchService from "../../service/FetchService";
import { doNothing } from "../../Util";

function TreeRoot(props){

    const{categorys,setCategorys} = useCategoryContext();
    const{selected,setSelected} = useSelectedContext();

    const isRootParent = (id)=>{
        if(props.root.id === id){
            return true; 
        }
        return false;
    }
    const preventDefault = (e) =>{
        e.preventDefault()
    }

    const{user,setUser} = useUserContext();

    const handleDrop = (e) =>{
        e.stopPropagation();
        if(selected.exerciseDTOs !== undefined){
            let temp = selected
            temp.parentId = props.root.id
            FetchService.fetch(JSON.stringify(temp),CATEGORY+UPDATE,PUT,user.jwt,doNothing,window.location.reload) 
        }
        else{
            let temp = selected
            temp.exerciseDTOs.push(selected)
            FetchService.fetch(JSON.stringify(temp),CATEGORY+UPDATE,PUT,user.jwt,updateCategorys,window.location.reload) 
        }      
    }
    const updateCategorys = (dto) =>{
        FetchService.fetch(null,CATEGORY+FINDALLBYUSERID+user.userDTO.id,GET,user.jwt,setCategorys,doNothing)
    }

    return(
        <div onDragOver={preventDefault} onDrop={handleDrop} className="tree_all">
            <h3>All</h3>
        {
            categorys.map((row,index)=>{
                return(
                    isRootParent(row.parentId) ?
                    <div key={index}>
                        <TreeBranch category={row} indentation={">"}/>
                    </div>
                    :
                    <div key={index}></div>
                )
            })
        }
        <Bud exercises={props.root.exerciseDTOs} indentation={">"}/>
        </div>
    )
}

function TreeBranch(props){

    const{categorys,setCategorys} = useCategoryContext();
    const{selected,setSelected} = useSelectedContext();
    const isRootParent = (id)=>{
        if(props.category.id === id){
            return true; 
        }
        return false;
    }

    const preventDefault = (e) =>{
        e.preventDefault()
    }

    const handleDragStart = (e) =>{
        setSelected(props.category)
        e.stopPropagation();
    }

    const{user,setUser} = useUserContext();

    const handleDrop = (e) =>{
        e.stopPropagation();
        if(selected.userId !== undefined){
            let temp = selected
            temp.parentId = props.category.id
            FetchService.fetch(JSON.stringify(temp),CATEGORY+UPDATE,PUT,user.jwt,doNothing,window.location.reload) 
        }
        else{
            props.category.exerciseDTOs.push(selected)
            FetchService.fetch(JSON.stringify(props.category),CATEGORY+UPDATE,PUT,user.jwt,updateCategorys,window.location.reload) 
        }
    }

    const updateCategorys = (dto) =>{
        FetchService.fetch(null,CATEGORY+FINDALLBYUSERID+user.userDTO.id,GET,user.jwt,setCategorys,doNothing)
    }
    const handleClick = (e) =>{
        setSelected(props.category)
        e.stopPropagation();
    }

    return(
        <div onClick={handleClick} onDragOver={preventDefault} onDrop={handleDrop} onDragStart={handleDragStart} className="tree_branch">
        <p>{props.indentation} Category {props.category.name}</p>
        {
            categorys.map((row,index)=>{
                return(
                    isRootParent(row.parentId) ?
                    <div key={index}>
                        <TreeBranch category={row} indentation={props.indentation}/>
                    </div>
                    :
                    <div key={index}></div>
                )
            })
        }
        <Bud category={props.category} exercises={props.category.exerciseDTOs} indentation={props.indentation}/>
        </div>
    )
}

function Bud(props){

    const{selected,setSelected} = useSelectedContext();

    const preventDefault = (e) =>{
        e.preventDefault()
    }

    const handleDragStart = (e) =>{
        let temp =JSON.parse(e.target.attributes.getNamedItem("dto").value)
        setSelected(temp)
        e.stopPropagation();
    }

    const handleClick = (e) =>{
        let temp =JSON.parse(e.target.attributes.getNamedItem("dto").value)
        setSelected(temp)
        e.stopPropagation();
    }

    const{user,setUser} = useUserContext();

    const handleDrop = (e) =>{
        e.stopPropagation();
        if(selected.exerciseDTOs !== undefined){
            let temp = selected
            temp.parentId = props.category.id
            FetchService.fetch(JSON.stringify(temp),CATEGORY+UPDATE,PUT,user.jwt,doNothing,window.location.reload) 
        }
        else{
            if(selected.exerciseDTOs !== undefined){
                let temp = selected
                temp.exerciseDTOs.push(selected)
                FetchService.fetch(JSON.stringify(temp),CATEGORY+UPDATE,PUT,user.jwt,updateCategorys,window.location.reload) 
            }
        }    
    }
    const updateCategorys = (dto) =>{
        FetchService.fetch(null,CATEGORY+FINDALLBYUSERID+user.userDTO.id,GET,user.jwt,setCategorys,doNothing)
    }

    return(
        <div>
            {
                props.exercises.map((row,index)=>{
                    return(
                        <div className="tree_bud" key={index} onClick={handleClick} onDragOver={preventDefault} onDrop={handleDrop} onDragStart={handleDragStart} >
                            <p dto={JSON.stringify(row)}>{props.indentation} Exercise {row.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TreeRoot