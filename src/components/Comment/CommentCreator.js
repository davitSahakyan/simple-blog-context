import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
// Router-dom
import { withRouter } from "react-router-dom";
// Matrial ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto",
        "& > *": {
            margin: "15px",
            width: "100%",
        },
    },
    button: {
        width: "auto",
    },
});

const CommentCreator = (props) => {
    const [comments, setComments] = useState(props.post.comments);
    const [commentValue, setCommentValue] = useState("");

    useEffect(() => {
        addCommentToPostst(comments);
    }, [comments]);

    const addComment = () => {
        let comment = {
            commentValue: commentValue,
            commentTime: time(),
            username: props.loginedUser[0].username,
            password: props.loginedUser[0].password,
            id: uniqueId(),
        };
        setComments([...comments, comment]);
    };

    const addCommentToPostst = (comments) => {
        props.handleAddCommentToPost(props.post.postId, comments);
    };

    const changeCommentValue = (id, commentValue) => {
        const chagedComments = comments.map((item) => {
            if (item.id === id) {
                return { ...item, commentValue: commentValue };
            }
            return item;
        });

        props.handleAddCommentToPost(props.post.postId, chagedComments);
    };

    const handleOnchange = (e) => {
        setCommentValue(e.target.value);
    };

    const time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    const uniqueId = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return "_" + Math.random().toString(36).substr(2, 9);
    };

    const deleteComment = (id) => {
        const filteredComments = comments.filter((item) => item.id !== id);

        setComments(filteredComments);
    };

    const classes = useStyles();

    return (
        <section>
            <h2 style={{ marginLeft: "4rem" }}>Comment</h2>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    className={classes.title}
                    id="standard-basic"
                    label="Write a Comment"
                    onChange={handleOnchange}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!commentValue}
                    onClick={addComment}
                >
                    Comment
                </Button>
            </form>
            {comments.map((item, index) => {
                return (
                    <Comment
                        post={props.post}
                        item={item}
                        key={item.id}
                        loginedUser={props.loginedUser}
                        changeCommentValue={changeCommentValue}
                        deleteComment={deleteComment}
                    />
                );
            })}
        </section>
    );
};

CommentCreator.propTypes = {
    post: PropTypes.object.isRequired,
    loginedUser: PropTypes.array.isRequired,
    handleAddCommentToPost: PropTypes.func.isRequired,
};

export default withRouter(CommentCreator);
