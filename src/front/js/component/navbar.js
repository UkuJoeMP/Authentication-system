import React from "react";
import { Link } from "react-router-dom";
import {useState, useContext} from "react";
import {Context} from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	
	const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="ml-auto">
					<button className="dropdown-item" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                &nbsp; Log Out</button>
				</div>
			</div>
		</nav>
	);
};
