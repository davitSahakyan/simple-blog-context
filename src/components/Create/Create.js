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
            postId: 0
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

    callback = () => {
        this.props.history.push("/simple-blog/");
        this.props.handleAddPost({
            titleValue: this.state.titleValue,
            postValue: this.state.postValue,
            username: this.props.users.find(user => user.isOnline === true)
                .username,
            time: this.time()
        });
    };

    givePostToApp = () => {
        this.setState(
            state => ({ postId: state.postId + 1 }),
            () => this.callback()
        );
    };
    time = () => {
        let date = new Date();
        return date.toLocaleTimeString();
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
