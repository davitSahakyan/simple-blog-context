import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import "./Card.css";
// components
import Comment from "../Comment/Comment";

const useStyles = makeStyles(theme => ({
    root: {
        width: "80%"
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: "lightskyblue"
    }
}));

function PostCard(props) {
    const classes = useStyles();
    // const [expanded, setExpanded] = React.useState(false);

    return props.posts.map((post, index) => {
        return (
            <Card className={classes.root} key={index}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {post.username.charAt(0)}
                        </Avatar>
                    }
                    title={`${post.titleValue} writed by ${post.username} `}
                    subheader={post.time}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {post.postValue}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="share" color="primary">
                        <Comment />
                    </IconButton>
                </CardActions>
            </Card>
        );
    });
}

export default PostCard;
