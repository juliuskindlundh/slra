import { Link } from "react-router-dom";

function LinkToRegister(){
    return(
        <div className="subComponent" id="linkToRegistration">
            <Link to="/registration">
                <h3>or create an account</h3>
            </Link>
        </div>
    )
}

export default LinkToRegister;