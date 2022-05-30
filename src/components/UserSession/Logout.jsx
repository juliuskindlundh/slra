import { LS_user } from "../../constants/LocalStorageKeys";

const { useEffect } = require("react")
const { useUserContext } = require("../../context/GlobalContext")

function Logout(){

    const{user,setUser} = useUserContext();

    useEffect(()=>{
        setUser(null);
        localStorage.removeItem(LS_user);
    },[])

    return(
        <div>Logged out</div>
    )
}

export default Logout;