import Registration from "./components/UserSession/Registration";
import {BrowserRouter , Route,Routes} from "react-router-dom";
import Login from "./components/UserSession/Login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Topbar from "./components/Navbar/Topbar";
import { ContextProvider } from "./context/GlobalContext";
import Logout from "./components/UserSession/Logout"
import LoginCompleated from "./components/UserSession/LoginCompleated";
import Exercises from "./components/Exercises/Exercises";
import { Sessions } from "./components/Sessions/Sessions";
import { Statistics } from "./components/Statistics/Statistics";

function App(){
    return(
        <ContextProvider>
            <BrowserRouter>
                <Topbar/>
                <Navbar/>
                <Routes>
                    <Route exact path="/home" element={<Home/>}/>
                    <Route exact path="/exercises" element={<Exercises/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/registration" element={<Registration/>}/>
                    <Route exact path="/logout" element={<Logout/>}/>
                    <Route exact path="/sessions" element={<Sessions/>}/>
                    <Route exact path="/statistics" element={<Statistics/>}/>
                    <Route exact path="/loginCompleated" element={<LoginCompleated/>}/>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;