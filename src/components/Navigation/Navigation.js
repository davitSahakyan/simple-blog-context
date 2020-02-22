import React from "react";
import "./Navigation.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
    render() {
        console.log(this.props.isLoggedIn);
        return (
            <div className="navigation-container">
                <div className="navigation">
                    <div className="left-nav">
                        <div>
                            <Link to="/simple-blog">
                                <span className="icon">
                                    <i className="fas fa-blog" />
                                    Blog
                                </span>
                            </Link>
                        </div>
                        <Link to="/simple-blog/create">
                            <div className="create-post-btn">create post</div>
                        </Link>
                    </div>
                    {this.props.isLoggedIn ? (
                        <div
                            className="right-nav"
                            onClick={() =>
                                this.props.history.push(
                                    "/simple-blog/log-out-modal"
                                )
                            }
                        >
                            <div type="button">Log out</div>
                        </div>
                    ) : (
                        <div
                            className="right-nav"
                            onClick={() =>
                                this.props.history.push("/simple-blog/verify")
                            }
                        >
                            <div type="button">Log in</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Navigation);
