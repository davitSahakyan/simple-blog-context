import React, { useState, useEffect, useContext } from "react";
// Router-dom
import { withRouter } from "react-router-dom";
// Material-ui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// CSS
import "./Edit.css";
// Components
import CommentCreator from "../Comment/CommentCreator";
// Context
import Context from "../../context";

const useStyles = makeStyles({
    root: {
        width: "80%",
        margin: "auto",
        "& > *": {
            margin: "10px",
            width: "100%",
        },
    },
    mainCard: {
        width: "80%",
        margin: "auto",
    },
});

const Edit = (props) => {
    const {
        users,
        posts,
        handleNewPostValue,
        handlePostsFilter,
        loginedUser,
        handleAddCommentToPost,
    } = useContext(Context);

    const [post, setPost] = useState(
        posts.find((post) => `:${post.postId}` === props.match.params.id)
    );
    const [isPostValueChanging, setIsPostValueChanging] = useState(false);
    const [newPostValue, setNewPostValue] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        let loginedUser = users.find((user) => user.isOnline === true);

        const buttonDisabled =
            loginedUser.username !== post.username &&
            loginedUser.password !== post.password;

        setButtonDisabled(buttonDisabled);
    });

    //  CHANGES IS-POST VALUE CHANGING
    const editPostValue = () => {
        setIsPostValueChanging(!isPostValueChanging);

        handleNewPostValue(
            post.postId,
            newPostValue ? newPostValue : post.postValue
        );
    };

    // On Post Value change
    const onPostValueChange = (e) => {
        setNewPostValue(e.target.value ? e.target.value : post.postValue);
    };

    // ON done icon click
    const handleDoneIconClick = () => {
        setIsPostValueChanging(false);
        handleNewPostValue(
            post.postId,
            newPostValue ? newPostValue : post.postValue
        );
    };

    // ON delete icon click
    const handleDeleteIconClick = () => {
        props.history.push("/simple-blog/");
        handlePostsFilter(post.postId);
    };

    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <div className={classes.mainCard}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                style={{ backgroundColor: green[300] }}
                            >
                                {post.username[0].toUpperCase()}
                            </Avatar>
                        }
                        title={`${post.titleValue} writed by ${post.username} `}
                        subheader={post.time}
                    />
                    <CardContent>
                        {isPostValueChanging ? (
                            <TextField
                                id="outlined-basic"
                                label="Write a post"
                                variant="outlined"
                                defaultValue={
                                    newPostValue ? newPostValue : post.postValue
                                }
                                onChange={onPostValueChange}
                            />
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {newPostValue ? newPostValue : post.postValue}
                            </Typography>
                        )}
                    </CardContent>
                    <div className="edit-btn-container">
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="share"
                                onClick={editPostValue}
                                disabled={buttonDisabled}
                            >
                                <EditIcon style={{ color: green[500] }} />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="share"
                                onClick={handleDeleteIconClick}
                                disabled={buttonDisabled}
                            >
                                <DeleteForeverIcon
                                    style={{ color: red[500] }}
                                />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="share"
                                onClick={handleDoneIconClick}
                            >
                                <DoneOutlineIcon color="primary" />
                            </IconButton>
                        </CardActions>
                    </div>
                </div>
            </Card>
            <CommentCreator
                post={post}
                loginedUser={loginedUser}
                handleAddCommentToPost={handleAddCommentToPost}
            />
        </>
    );
};

export default withRouter(Edit);
