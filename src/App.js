import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import LogIn from "./components/LogIn/LogIn";
import Create from "./components/Create/Create";
import PostCard from "./components/Posts/Card";
import Edit from "./components/Edit/Edit";

import LogOutModal from "./components/Navigation/LogOutModal";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            posts: [],
            users: [],
            postId: 0
        };
    }
    // Time
    time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    handleAddPost = post => {
        let postWithId = { ...post, postId: this.state.postId + 1 };
        this.setState({
            posts: [postWithId, ...this.state.posts],
            postId: this.state.postId + 1
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

    // Handle function that adds new value to post with that id
    handleNewPostValue = (id, newPostValue) => {
        this.setState({
            posts: this.state.posts.map(post => {
                if (post.postId === id) {
                    console.log("yes");
                    return {
                        ...post,
                        postValue: newPostValue,
                        edited: this.time()
                    };
                } else {
                    return post;
                }
            })
        });
    };

    render() {
        const { isLoggedIn, posts, users } = this.state;
        console.log("POSTS---", posts);
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
                    {/* EDIT PART */}
                    <Route path="/simple-blog/post/edit:id" exact>
                        <Edit
                            posts={posts}
                            handleNewPostValue={this.handleNewPostValue}
                        />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
