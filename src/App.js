import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import LogIn from "./components/LogIn/LogIn";
import Create from "./components/Create/Create";
import PostCard from "./components/Posts/Card";

import LogOutModal from "./components/Navigation/LogOutModal";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            posts: [],
            users: []
        };
    }

    handleAddPost = post => {
        this.setState({
            posts: [post, ...this.state.posts]
        });
    };

    changeRegistrationStatus = status => {
        this.setState({ isLoggedIn: status });
    };

    handleUserInfo = (username, password) => {
        this.setState({
            users: [
                ...this.state.users,
                { username: username, password: password }
            ]
        });
    };

    render() {
        const { isLoggedIn, posts, users } = this.state;
        return (
            <div className="app">
                <Navigation
                    isLoggedIn={this.state.isLoggedIn}
                    changeRegistrationStatus={this.changeRegistrationStatus}
                />

                <Switch>
                    <Route path="/simple-blog/log-out-modal" exact>
                        <LogOutModal
                            changeRegistrationStatus={
                                this.changeRegistrationStatus
                            }
                        />
                    </Route>
                    <Route path="/simple-blog/verify">
                        <LogIn
                            changeRegistrationStatus={
                                this.changeRegistrationStatus
                            }
                            handleUserInfo={this.handleUserInfo}
                        />
                    </Route>
                    <Route path="/simple-blog/create">
                        {isLoggedIn ? (
                            <Create
                                handleAddPost={this.handleAddPost}
                                users={users}
                            />
                        ) : (
                            <Redirect to="/simple-blog/verify" />
                        )}
                    </Route>
                    <Route path="/simple-blog" exact>
                        {posts[0] !== undefined ? (
                            <PostCard posts={posts} />
                        ) : (
                            <Registration />
                        )}
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
