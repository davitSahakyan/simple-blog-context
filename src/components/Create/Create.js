import React from "react";
import "./Main.css";
// import Comment from '../Comment/Comment'
import { withRouter } from "react-router-dom";
// Material ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    root: {
        width: "80%",
        "& > *": {
            margin: theme.spacing(1),
            width: "100%"
        }
    }
});

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingGreeting: true,
            titleValue: "",
            postValue: "",
            inputId: 0
        };
    }

    handleGreetingStatusChange = () => {
        this.setState({ isShowingGreeting: false });
    };

    // ONCHANGE
    handleTitleValueChange = e => {
        this.setState({
            titleValue: e.target.value
        });
    };

    handlePostValueChange = e => {
        this.setState({
            postValue: e.target.value
        });
    };
    // ONCHANGE END

    givePostToApp = () => {
        this.setState({ inputId: this.state.inputId + 1 }, () =>
            this.callback()
        );
    };
    time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
    };

    callback = () => {
        this.props.history.push("/simple-blog/");
        this.props.handleAddPost({
            postId: this.state.inputId,
            titleValue: this.state.titleValue,
            postValue: this.state.postValue,
            username: this.props.users[this.props.users.length - 1].username,
            time: this.time()
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="input-global-container">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        className={classes.title}
                        id="standard-basic"
                        label="Write a title"
                        onChange={this.handleTitleValueChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Write a post"
                        variant="outlined"
                        onChange={this.handlePostValueChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.givePostToApp}
                    >
                        <span>
                            <i className="fas fa-check fa-2x"></i>
                        </span>
                    </Button>
                </form>
            </div>
        );
    }
}

// export default withRouter(Create)
export default withStyles(styles)(withRouter(Create));
