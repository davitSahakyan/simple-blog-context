import React, { useState, useEffect } from "react";
import "./LogIn.css";
import { withRouter } from "react-router-dom";

function LogIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isOnline, setIsOnline] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showValidationError = (element, message) => {
        setErrors([...errors, { element, message }]);
    };

    const clearValidationError = (element) => {
        let newArray = [];
        for (let err of errors) {
            if (element !== err.element) {
                newArray.push(err);
            }
        }
        setErrors(newArray);
    };

    const handleChange = (e) => {
        if (e.target.id === "username") {
            setUsername(e.target.value);
            clearValidationError("username");
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
            clearValidationError("password");
        }
    };

    let registeredUser = props.users.find(
        (user) => user.username === username && user.password === password
    );

    useEffect(() => {
        if (registeredUser) {
            give(registeredUser);
        } else if (username && password) {
            createNewUser();
        }
    }, [isLoggedIn, isOnline]);

    const submitRegistration = () => {
        if (username === "") {
            showValidationError("username", "Username can't be empty");
        }
        if (password === "") {
            showValidationError("password", "Password can't be empty");
        }

        if (registeredUser) {
            setIsLoggedIn(true);
            setIsOnline(true);
        } else if (username && password) {
            setIsLoggedIn(true);
            setIsOnline(true);
        }
    };

    const give = (registeredUser) => {
        props.changeLoggedUserStatusToOnline(registeredUser);
        props.history.push("/simple-blog");
    };

    const createNewUser = () => {
        props.history.push("/simple-blog");
        props.handleUserInfo(username, password, isOnline);
    };

    let usernameErr = null;
    let passwordErr = null;

    for (let err of errors) {
        if (err.element === "username") {
            usernameErr = err.message;
        }
        if (err.element === "password") {
            passwordErr = err.message;
        }
    }

    return (
        <div className="login-container">
            <div className="login-title-container">
                <h2 className="login-title">Log in</h2>
            </div>
            <div className="login">
                <input
                    type="text"
                    placeholder="Name *"
                    id="username"
                    className="login-input"
                    onChange={handleChange}
                />
                <sub className="error"> {usernameErr ? usernameErr : ""} </sub>
                <input
                    type="password"
                    placeholder="Password *"
                    id="password"
                    className="login-input"
                    onChange={handleChange}
                />
                <sub className="error"> {passwordErr ? passwordErr : ""} </sub>
                <button className="login-btn" onClick={submitRegistration}>
                    log in
                </button>
            </div>
        </div>
    );
}

export default withRouter(LogIn);
