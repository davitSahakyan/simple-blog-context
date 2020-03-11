import React from "react";
import Comment from "./Comment";
// Router-dom
import { withRouter } from "react-router-dom";
// Matrial ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    root: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto",
        "& > *": {
            margin: theme.spacing(3),
            width: "100%"
        }
    },
    button: {
        width: "auto"
    }
});

class CommentCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.post.comments,
            commentValue: "",
            commentTime: this.time
        };
    }

    // Add Comment to Comments array
    addComment = () => {
        let comment = {
            commentValue: this.state.commentValue,
            commentTime: this.state.commentTime(),
            username: this.props.loginedUser[0].username,
            password: this.props.loginedUser[0].password,
            id: this.uniqueId()
        };
        this.setState(
            {
                comments: [...this.state.comments, comment]
            },
            () => this.addCommentToPostst(this.state.comments)
        );
    };

    addCommentToPostst = comments => {
        this.props.handleAddCommentToPost(this.props.post.postId, comments);
    };

    changeCommentValue = (id, commentValue) => {
        const chagedComments = this.state.comments.map(item => {
            if (item.id === id) {
                return { ...item, commentValue: commentValue };
            }
            return item;
        });

        this.props.handleAddCommentToPost(
            this.props.post.postId,
            chagedComments
        );
    };

    // Comment Value onchange
    handleOnchange = e => {
        this.setState({
            commentValue: e.target.value
        });
    };

    time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    uniqueId = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return (
            "_" +
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
    };

    deleteComment = id => {
        const filteredComments = this.state.comments.filter(
            item => item.id !== id
        );

        this.setState({
            comments: filteredComments
        });
    };

    render() {
        const { classes } = this.props;
        const { comments, commentValue } = this.state;

        return (
            <section>
                <h2 style={{ marginLeft: "4rem" }}>Comment</h2>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        className={classes.title}
                        id="standard-basic"
                        label="Write a Comment"
                        onChange={this.handleOnchange}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disabled={!commentValue}
                        onClick={this.addComment}
                    >
                        Comment
                    </Button>
                </form>
                {comments.map((item, index) => {
                    return (
                        <Comment
                            post={this.props.post}
                            item={item}
                            key={item.id}
                            loginedUser={this.props.loginedUser}
                            changeCommentValue={this.changeCommentValue}
                            deleteComment={this.deleteComment}
                        />
                    );
                })}
            </section>
        );
    }
}

export default withStyles(styles)(withRouter(CommentCreator));
