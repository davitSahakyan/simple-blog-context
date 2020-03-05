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
import { green, red } from "@material-ui/core/colors";
import { withStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// CSS
import "../Edit/Edit.css";
// Components

const styles = theme => ({
    root: {
        width: "60%",
        margin: "1rem auto",
        height: 150,
        backgroundColor: "#f2f2f2",
        "& > *": {
            margin: theme.spacing(1),
            width: "100%"
        }
    },
    mainCard: {
        width: "80%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between"
    }
});

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentEditing: false,
            commentValue: ""
        };
    }

    changeEditStatus = () => {
        this.setState(
            {
                isCommentEditing: !this.state.isCommentEditing
            },
            this.props.changeCommentValue(
                this.props.item.id,
                this.state.commentValue
            )
        );
    };

    handleCommentOnChange = e => {
        this.setState({
            commentValue: e.target.value
        });
    };

    render() {
        const { classes, post, item, loginedUser } = this.props;
        const { isCommentEditing, commentValue } = this.state;
        console.log("new commentValue --", commentValue);
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
                            title={`${item.commentTime} writed by ${item.username} `}
                        />
                        <CardContent>
                            {isCommentEditing ? (
                                <TextField
                                    id="outlined-basic"
                                    label="Write a post"
                                    variant="outlined"
                                    defaultValue={item.commentValue}
                                    onChange={this.handleCommentOnChange}
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
                                onClick={this.changeEditStatus}
                                // disabled={this.state.buttonDisabled}
                            >
                                <EditIcon style={{ color: green[500] }} />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="share"
                                // onClick={this.handleDeleteIconClick}
                            >
                                <DeleteForeverIcon
                                    style={{ color: red[500] }}
                                />
                            </IconButton>
                        </CardActions>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(withRouter(Comment));
