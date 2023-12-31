import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to={"/"}>Home</Link>
            <Link to={"/signin"}>Sign In Automatically</Link>
            <Link to="/login">Login</Link>
            <Link to={"/register"}>Register</Link>
        </div>
    );
};

export default Navbar;