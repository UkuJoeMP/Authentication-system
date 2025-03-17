import React from "react";
import {useState, useContext} from "react";
import {Context} from "../store/appContext"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Login() {

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    
    function handleChange({target}) {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        if (user.email.trim() === "" || user.password === "") {
            alert("All credentials are required");
            return;
        }
        console.log("Submitting Login:", user); // Debugging
        const response = await actions.login(user);
        console.log("Login Response:", response); // Debugging
    
        if (response.status === 200 && store.token !== null) {
            alert("Logged in successfully");
            navigate("/private");
        } else {
            alert("Invalid email or password");
        }
    }

    async function onClick(event) {
        
    }

    return(
        <div className="container justify-content-center align-items-center col-4 pt-5">
                <h1 className="text-center">Login</h1>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2 align-items-center">Submit</button>
                </form>
                <div className="aling-items-center">
                <NavLink to="/register">You don't have an account?</NavLink>
                </div>
        </div>
    )
}

export default Login