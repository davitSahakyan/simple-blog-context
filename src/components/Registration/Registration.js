import React, { useContext } from "react";
import "./Registration.css";
import { withRouter } from "react-router-dom";
// Context
import Context from "../../context";

const Registration = (props) => {
    const { isLoggedIn } = useContext(Context);
    if (isLoggedIn) {
        return (
            <div className="registartion">
                <div className="registartion-box">
                    <span
                        className="log-in-btn"
                        onClick={() =>
                            props.history.push("/simple-blog/create")
                        }
                    >
                        Create post{" "}
                    </span>
                    and tell us your story!!!
                </div>
            </div>
        );
    }

    return (
        <div className="registartion">
            <div className="registartion-box">
                <span
                    className="log-in-btn"
                    onClick={() => props.history.push("/simple-blog/verify")}
                >
                    Log in{" "}
                </span>
                and tell us your story!!!
            </div>
        </div>
    );
};

export default withRouter(Registration);
