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
            comments: [],
            commentValue: "",
            commentTime: this.time
        };
    }

    // Add Comment to Comments array
    addComment = () => {
        this.setState({
            comments: [
                ...this.state.comments,
                {
                    commentValue: this.state.commentValue,
                    commentTime: this.state.commentTime()
                }
            ]
        });
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

    render() {
        const { classes } = this.props;
        const { comments } = this.state;
        console.log("COMMENTS ---", this.state.comments);
        // console.log('POST WITH COMMENTS ---' , this.state.comments )
        return (
            <section>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        className={classes.title}
                        id="standard-basic"
                        label="Write a title"
                        onChange={this.handleOnchange}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
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
                            index={index}
                        />
                    );
                })}
            </section>
        );
    }
}

export default withStyles(styles)(withRouter(CommentCreator));
