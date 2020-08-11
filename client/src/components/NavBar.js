import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const NavBar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler = e => {
        e.preventDefault();
        auth.logout();
        history.push('/');
    }
    return <nav>
        <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><NavLink to="/" onClick={logoutHandler}>Logout</NavLink></li>

            </ul>
        </div>
    </nav>
}
