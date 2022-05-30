import { useEffect, useState } from "react";
import { CATEGORY, FINDALLBYUSERID, GET } from "../constants/FetchConstants";
import { LS_user } from "../constants/LocalStorageKeys";
import { useCategoryContext, useUserContext } from "../context/GlobalContext";
import FetchService from "../service/FetchService";
import { isNull } from "../Util";
import ExerciseInput from "./Input/ExerciseInput";

function Home(){

    const{categorys,setCategorys} = useCategoryContext();
    const{user,setUser} = useUserContext();

    return(
        isNull(user) ?
            <div>
                Not logged in
            </div>
            : 
            <div className="component" id="home">
                <ExerciseInput/>
            </div>     
    )
}

export default Home;