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
            isLoggedIn: localStorage.getItem("isLoggedIn") || false,
            posts: JSON.parse(localStorage.getItem("posts") || "[]"),
            users: JSON.parse(localStorage.getItem("users") || "[]"),
            postId: localStorage.getItem("postId") || 0
        };
    }
    // Time
    time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    handleAddPost = post => {
        let postWithId = { ...post, postId: this.state.postId + 1 };
        const newPosts = [postWithId, ...this.state.posts];
        this.setState({
            posts: newPosts,
            postId: this.state.postId + 1
        });
        localStorage.setItem("postId", this.state.postId);
        localStorage.setItem("posts", JSON.stringify(newPosts));
    };

    changeRegistrationStatus = status => {
        this.setState({ isLoggedIn: status });
        localStorage.setItem("isLoggedIn", this.state.isLoggedIn);
    };

    handleUserInfo = (username, password) => {
        const users = [
            ...this.state.users,
            { username: username, password: password }
        ];
        this.setState({
            users: users
        });
        localStorage.setItem("users", JSON.stringify(users));
    };

    // Handle function that adds new value to post with that id
    handleNewPostValue = (id, newPostValue) => {
        const newPosts = this.state.posts.map(post => {
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
        });
        localStorage.setItem("posts", JSON.stringify(newPosts));
        this.setState({
            posts: newPosts
        });
    };

    // Handle function that filteres posts and takes all posts accept deleted
    handlePostsFilter = id => {
        const posts = this.state.posts.filter(post => post.postId !== id);
        this.setState({
            posts: posts
        });
        localStorage.setItem("posts", JSON.stringify(posts));
    };

    render() {
        const { isLoggedIn, posts, users } = this.state;
        console.log("POSTS---", posts);
        console.log("LOCALSTORAGE---", localStorage);
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
                            handlePostsFilter={this.handlePostsFilter}
                        />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
