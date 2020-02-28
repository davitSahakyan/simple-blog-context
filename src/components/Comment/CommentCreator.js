import React from "react";
import Comment from "./Comment";

class CommentCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentValue: "",
            commentTime: this.time
        };
    }

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
        console.log("COMMENTS ---", this.state.comments);
        // console.log('POST WITH COMMENTS ---' , this.state.comments )
        return (
            <section>
                <input type="text" onChange={this.handleOnchange} />
                <button onClick={this.addComment}>Comment</button>
                {/* <div>
                    {this.props.post.comments.map((comment, index) => {
                        return (
                            <Comment post={this.props.post} comment={comment} />
                        );
                    })}
                </div> */}
            </section>
        );
    }
}

export default CommentCreator;
