import React from "react";
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
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// CSS
import "./Edit.css";

const styles = theme => ({
    root: {
        width: "80%",
        margin: "auto",
        "& > *": {
            margin: theme.spacing(1),
            width: "100%"
        }
    },
    mainCard: {
        width: "80%",
        margin: "auto"
    }
});

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            isPostValueChanging: false,
            newPostValue: ""
        };
    }

    componentDidMount() {
        let newPost = this.props.posts.find(
            post => `:${post.postId}` === this.props.match.params.id
        );
        this.setState({
            post: newPost
        });
    }
    //  CHANGES IS-POST VALUE CHANGING
    editPostValue = () => {
        this.setState({
            isPostValueChanging: true
        });
    };

    // On Post Value change
    onPostValueChange = e => {
        this.setState({ newPostValue: e.target.value });
    };

    handleDoneIconClick = () => {
        const { post, newPostValue } = this.state;
        this.props.history.push("/simple-blog/");
        this.props.handleNewPostValue(post.postId, newPostValue);
    };

    render() {
        const { classes } = this.props;
        const { post, isPostValueChanging, newPostValue } = this.state;
        console.log("POSTS --", this.props.posts);
        console.log("POST --", post);
        console.log("CHANGED VALUE --", newPostValue);
        return (
            <Card className={classes.root}>
                <div className={classes.mainCard}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                style={{ backgroundColor: green[300] }}
                            >
                                {post.username}
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
                                defaultValue={post.postValue}
                                onChange={this.onPostValueChange}
                            />
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {post.postValue}
                            </Typography>
                        )}
                    </CardContent>
                    <div className="edit-btn-container">
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="share"
                                onClick={this.editPostValue}
                            >
                                <EditIcon style={{ color: green[500] }} />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton aria-label="share">
                                <DeleteForeverIcon
                                    style={{ color: red[500] }}
                                />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="share"
                                onClick={this.handleDoneIconClick}
                            >
                                <DoneOutlineIcon color="primary" />
                            </IconButton>
                        </CardActions>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(withRouter(Edit));
