import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import LogIn from "./components/LogIn/LogIn";
import Create from "./components/Create/Create";
import Posts from "./components/Posts/Posts";
import Edit from "./components/Edit/Edit";
import Context from "./context";

import LogOutModal from "./components/Navigation/LogOutModal";

const App = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem("posts")) || []
    );
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem("users")) || []
    );
    const [postId, setPostId] = useState(
        JSON.parse(localStorage.getItem("postId")) || 0
    );

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
        localStorage.setItem("users", JSON.stringify(users));
        changeLoginStatus();
    }, [isLoggedIn, users]);
    // Time
    const time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    const handleAddPost = (post) => {
        let postWithId = { ...post, postId: postId + 1 };
        const newPosts = [postWithId, ...posts];
        setPosts(newPosts);
        setPostId(postId + 1);

        localStorage.setItem("postId", JSON.stringify(postId + 1));
        localStorage.setItem("posts", JSON.stringify(newPosts));
    };

    const changeLoginStatus = () => {
        const isSomebodyLoggedIn = users.some((user) => user.isOnline === true);
        setIsLoggedIn(isSomebodyLoggedIn);
    };

    const changeAllUsersStatusToOffline = () => {
        setUsers(
            users.map((user) => ({
                ...user,
                isOnline: false,
            }))
        );
    };

    const changeLoggedUserStatusToOnline = (registeredUser) => {
        setUsers(
            users.map((user) => {
                if (user.username === registeredUser.username) {
                    return { ...user, isOnline: true };
                }
                return user;
            })
        );
        setIsLoggedIn(true);
    };

    const handleUserInfo = (username, password, isOnline) => {
        setIsLoggedIn(true);
        setUsers([
            ...users,
            {
                username: username,
                password: password,
                isOnline: isOnline,
            },
        ]);
    };

    // Handle function that adds new value to post with that id
    const handleNewPostValue = (id, newPostValue) => {
        const newPosts = posts.map((post) => {
            if (post.postId === id) {
                return {
                    ...post,
                    postValue: newPostValue,
                    edited: time(),
                };
            } else {
                return post;
            }
        });
        localStorage.setItem("posts", JSON.stringify(newPosts));
        setPosts(newPosts);
    };

    // Handle function that filteres posts and takes all posts accept deleted
    const handlePostsFilter = (id) => {
        setPosts(posts.filter((post) => post.postId !== id));

        localStorage.setItem("posts", JSON.stringify(posts));
    };

    // Add Comments to its post
    const handleAddCommentToPost = (postId, comments) => {
        let newPosts = posts.map((post) => {
            if (post.postId == postId) {
                post.comments = comments;
            }
            return post;
        });
        setPosts(newPosts);

        localStorage.setItem("posts", JSON.stringify(newPosts));
    };

    let loginedUser = users.filter((user) => user.isOnline === true);

    return (
        <Context.Provider value={{ isLoggedIn }}>
            <div className="app">
                <Navigation />

                <Switch>
                    <Route path="/simple-blog/log-out-modal" exact>
                        <LogOutModal
                            changeAllUsersStatusToOffline={
                                changeAllUsersStatusToOffline
                            }
                            changeLoginStatus={changeLoginStatus}
                        />
                    </Route>
                    <Route path="/simple-blog/verify">
                        <LogIn
                            users={users}
                            changeLoggedUserStatusToOnline={
                                changeLoggedUserStatusToOnline
                            }
                            handleUserInfo={handleUserInfo}
                        />
                    </Route>
                    <Route path="/simple-blog/create">
                        {isLoggedIn ? (
                            <Create
                                handleAddPost={handleAddPost}
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
                            handleNewPostValue={handleNewPostValue}
                            handlePostsFilter={handlePostsFilter}
                            loginedUser={loginedUser}
                            handleAddCommentToPost={handleAddCommentToPost}
                        />
                    </Route>
                </Switch>
            </div>
        </Context.Provider>
    );
};

export default App;
