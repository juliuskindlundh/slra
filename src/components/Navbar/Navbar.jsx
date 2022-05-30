import NavbarLink from "./NavbarLink";

function Navbar(){
    return(
        <div className="navbar">
            <ul id="navbarUL">
                <div className="navbarLI">{<NavbarLink linkName="Input" link="/home"/>}</div>
                <div className="navbarLI">{<NavbarLink linkName="Exercises" link="/exercises"/>}</div>
                <div className="navbarLI">{<NavbarLink linkName="Sessions" link="/sessions"/>}</div>
                <div className="navbarLI">{<NavbarLink linkName="Statistics" link="/statistics"/>}</div>
            </ul>
        </div>
    )
}

export default Navbar;