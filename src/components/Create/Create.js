import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Main.css";
// import Comment from '../Comment/Comment'
import { withRouter } from "react-router-dom";
// Material ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// Context
import Context from "../../context";

const useStyles = makeStyles({
    root: {
        width: "80%",
        "& > *": {
            margin: 5,
            width: "100%",
        },
    },
});

const Create = (props) => {
    const [titleValue, setTitleValue] = useState("");
    const [postValue, setPostValue] = useState("");
    const [postId, setPostId] = useState(0);
    const { users, handleAddPost } = useContext(Context);
    // ONCHANGE
    const handleTitleValueChange = (e) => {
        setTitleValue(e.target.value);
    };

    const handlePostValueChange = (e) => {
        setPostValue(e.target.value);
    };
    // ONCHANGE END

    const callback = () => {
        props.history.push("/simple-blog/");
        handleAddPost({
            titleValue: titleValue,
            postValue: postValue,
            username: users.find((user) => user.isOnline === true).username,
            time: time(),
            comments: [],
        });
    };

    const givePostToApp = () => {
        setPostId(postId + 1);
        callback();
    };

    const time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    const classes = useStyles();
    return (
        <div className="input-global-container">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    className={classes.title}
                    id="standard-basic"
                    label="Write a title"
                    onChange={handleTitleValueChange}
                />
                <TextField
                    id="outlined-basic"
                    label="Write a post"
                    variant="outlined"
                    onChange={handlePostValueChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={givePostToApp}
                >
                    <span>
                        <i className="fas fa-check fa-2x">Create</i>
                    </span>
                </Button>
            </form>
        </div>
    );
};

export default withRouter(Create);
