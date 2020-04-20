import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// CSS
import "../Edit/Edit.css";
// Components

const useStyles = makeStyles({
    root: {
        width: "60%",
        margin: "1rem auto",
        height: 150,
        backgroundColor: "#f2f2f2",
        "& > *": {
            margin: "5px",
            width: "100%",
        },
    },
    mainCard: {
        width: "80%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
    },
});

const Comment = (props) => {
    const [isCommentEditing, setIsCommentEditing] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const changeEditStatus = () => {
        setIsCommentEditing(!isCommentEditing);

        props.changeCommentValue(props.item.id, commentValue);
    };

    const handleCommentOnChange = (e) => {
        setCommentValue(e.target.value);
    };

    const checkIfIsLoggedIn = () => {
        const { item, loginedUser } = props;
        if (
            loginedUser[0].username === item.username &&
            loginedUser[0].password === item.password
        ) {
            return false;
        } else {
            return true;
        }
    };

    const { item, deleteComment } = props;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.mainCard}>
                <div>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                style={{ backgroundColor: green[300] }}
                            >
                                {item.username[0].toUpperCase()}
                            </Avatar>
                        }
                        title={`${item.commentTime} written by ${item.username} `}
                    />
                    <CardContent>
                        {isCommentEditing ? (
                            <TextField
                                id="outlined-basic"
                                label="Write a post"
                                variant="outlined"
                                defaultValue={
                                    commentValue
                                        ? commentValue
                                        : item.commentValue
                                }
                                onChange={handleCommentOnChange}
                            />
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {commentValue
                                    ? commentValue
                                    : item.commentValue}
                            </Typography>
                        )}
                    </CardContent>
                </div>
                <div>
                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="share"
                            onClick={changeEditStatus}
                            disabled={checkIfIsLoggedIn()}
                        >
                            <EditIcon style={{ color: green[500] }} />
                        </IconButton>
                    </CardActions>
                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="share"
                            disabled={checkIfIsLoggedIn()}
                            onClick={() => deleteComment(props.item.id)}
                        >
                            <DeleteForeverIcon style={{ color: red[500] }} />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
};

Comment.propTypes = {
    post: PropTypes.object.isRequired,
    loginedUser: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired,
    changeCommentValue: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

export default withRouter(Comment);
