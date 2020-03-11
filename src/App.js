import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import LogIn from "./components/LogIn/LogIn";
import Create from "./components/Create/Create";
import Posts from "./components/Posts/Posts";
import Edit from "./components/Edit/Edit";

import LogOutModal from "./components/Navigation/LogOutModal";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
            posts: JSON.parse(localStorage.getItem("posts") || "[]"),
            users: JSON.parse(localStorage.getItem("users") || "[]"),
            postId: JSON.parse(localStorage.getItem("postId")) || 0
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
        localStorage.setItem("postId", JSON.stringify(this.state.postId + 1));
        localStorage.setItem("posts", JSON.stringify(newPosts));
    };

    changeLoginStatus = () => {
        localStorage.setItem("users", JSON.stringify(this.state.users));
        const isSomebodyLoggedIn = this.state.users.some(
            user => user.isOnline === true
        );
        this.setState({
            isLoggedIn: isSomebodyLoggedIn
        });
        localStorage.setItem("isLoggedIn", JSON.stringify(isSomebodyLoggedIn));
    };

    changeAllUsersStatusToOffline = () => {
        this.setState(
            {
                users: this.state.users.map(user => ({
                    ...user,
                    isOnline: false
                }))
            },
            () => this.changeLoginStatus()
        );
    };

    changeLoggedUserStatusToOnline = registeredUser => {
        this.setState({
            users: this.state.users.map(user => {
                if (user.username === registeredUser.username) {
                    return { ...user, isOnline: true };
                }
                return user;
            }),
            isLoggedIn: true
        });
    };

    handleUserInfo = (username, password, isOnline) => {
        this.setState(
            state => ({
                isLoggedIn: true,
                users: [
                    ...state.users,
                    {
                        username: username,
                        password: password,
                        isOnline: isOnline
                    }
                ]
            }),
            () =>
                localStorage.setItem(
                    "users",
                    JSON.stringify(this.state.users),
                    this.changeLoginStatus()
                ),
            localStorage.setItem(
                "isLoggedIn",
                JSON.stringify(this.state.isLoggedIn)
            )
        );
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
        this.setState(
            state => ({
                posts: state.posts.filter(post => post.postId !== id)
            }),
            () =>
                localStorage.setItem("posts", JSON.stringify(this.state.posts))
        );
    };

    // Add Comments to its post
    handleAddCommentToPost = (postId, comments) => {
        const { posts } = this.state;
        let newPosts = posts.map(post => {
            if (post.postId == postId) {
                post.comments = comments;
            }
            return post;
        });
        this.setState({
            posts: newPosts
        });
        localStorage.setItem("posts", JSON.stringify(newPosts));
    };

    render() {
        const { isLoggedIn, posts, users } = this.state;

        let loginedUser = users.filter(user => user.isOnline === true);

        return (
            <div className="app">
                <Navigation
                    isLoggedIn={isLoggedIn}
                    changeRegistrationStatus={this.changeRegistrationStatus}
                />

                <Switch>
                    <Route path="/simple-blog/log-out-modal" exact>
                        <LogOutModal
                            changeAllUsersStatusToOffline={
                                this.changeAllUsersStatusToOffline
                            }
                            changeLoginStatus={this.changeLoginStatus}
                        />
                    </Route>
                    <Route path="/simple-blog/verify">
                        <LogIn
                            users={this.state.users}
                            changeLoggedUserStatusToOnline={
                                this.changeLoggedUserStatusToOnline
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
                        {!!posts.length ? (
                            <Posts posts={posts} isLoggedIn={isLoggedIn} />
                        ) : (
                            <Registration isLoggedIn={isLoggedIn} />
                        )}
                    </Route>
                    {/* EDIT PART */}
                    <Route path="/simple-blog/post/edit:id" exact>
                        <Edit
                            users={users}
                            posts={posts}
                            handleNewPostValue={this.handleNewPostValue}
                            handlePostsFilter={this.handlePostsFilter}
                            loginedUser={loginedUser}
                            handleAddCommentToPost={this.handleAddCommentToPost}
                        />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
