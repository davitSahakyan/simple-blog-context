import React from "react";
import "./LogIn.css";
import { withRouter } from 'react-router-dom'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: [],
            isLoggedIn : false,
            a : 'sd',
        };
    }

    showValidationError = (element, message) => {
        this.setState(prevState => ({
            errors: [...prevState.errors, { element, message }]
        }));
    };

    clearValidationError = (element) => {
        this.setState(prevState => {
            let newArray = [];
            for (let err of prevState.errors) {
                if (element !== err.element) {
                    newArray.push(err);
                }
            }
            return { errors: newArray };
        });
    }

    handleChange = e => {
        if (e.target.id === "username") {
            this.setState({ username: e.target.value });
            this.clearValidationError("username");
        } else if (e.target.id === "password") {
            this.setState({ password: e.target.value });
            this.clearValidationError("password");
        }
        
    };

    submitRegistration = () => {
        const { username , password  } = this.state
        if (username === "") {
            this.showValidationError("username", "Username can't be empty");
        }
        if (password === "") {
            this.showValidationError("password", "Password can't be empty");
        }

        if(username && password){
            this.setState({ isLoggedIn : true} , 
            () => this.refresh()
            )
        }
    };

    refresh = () =>{
        this.props.changeRegistrationStatus(this.state.isLoggedIn)
        this.props.history.push("/simple-blog/main")
    }


    

    render() {
        let usernameErr = null;
        let passwordErr = null;

        for (let err of this.state.errors) {
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
                        onChange={this.handleChange}
                    />
                    <sub className="error">
                        {" "}
                        {usernameErr ? usernameErr : ""}{" "}
                    </sub>
                    <input
                        type="password"
                        placeholder="Password *"
                        id="password"
                        className="login-input"
                        onChange={this.handleChange}
                    />
                    <sub className="error">
                        {" "}
                        {passwordErr ? passwordErr : ""}{" "}
                    </sub>
                        <button
                            className="login-btn"
                            onClick={this.submitRegistration}
                        >
                            log in
                        </button>
                        
                </div>
            </div>
        );
    }
}

export default withRouter(LogIn);
