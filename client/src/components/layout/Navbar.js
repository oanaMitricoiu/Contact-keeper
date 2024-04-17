import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);

    const { logout } = authContext;

    const onLogout = () => {
        logout();
        console.log("user is logged out");
    };

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />
                {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <button className="logoutButton" onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt",
};

export default Navbar;
