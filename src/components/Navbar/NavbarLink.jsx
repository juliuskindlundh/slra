import { Link } from "react-router-dom";

function NavbarLink(props){
    return(
        <div className="navbarLinkContainer">
            <Link to={props.link} className="navbarlink">
                <h3>{props.linkName}</h3>
            </Link>
        </div>
    )
}

export default NavbarLink;