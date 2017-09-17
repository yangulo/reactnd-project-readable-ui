import React, { Component } from 'react';
import * as CommentAPI from './CommentAPI';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = { category: 0 };
    };

    state = {
        comments: [],
        open: false
    }

    componentDidMount() {
        let id = this.props.parentId;
        console.log(id);
        CommentAPI.getComments(id).then((comments) => {
            this.setState({ comments: comments })
            console.log(comments);
        })
    }

    upVote(id) {
        CommentAPI.upVote(id).then((data) => {
            let comments = this.state.comments;
            for (let comment of comments) {
                if (comment.id === id) {
                    comment.voteScore = comment.voteScore + 1;
                }
            }
            this.setState({ comments: comments });
        });
    }

    downVote(id) {
        CommentAPI.downVote(id).then((data) => {
            let comments = this.state.comments;
            for (let comment of comments) {
                if (comment.id == id) {
                    comment.voteScore = comment.voteScore - 1;
                }
            }
            this.setState({ comments: comments });
        });
    }

    deleteComment(id) {
        CommentAPI.removeComment(id).then((data) => {
            let comments = this.state.comments;
            for (let comment of comments) {
                if (comment.id == id) {
                    window.location = '/post?id=' + comment.parentId;
                }
            }
            this.setState({ comments: comments });
        });
    }

    updateComment() {
        CommentAPI.update(this.state.commentId, new Date().getTime(), this.state.commentBody).then((data) => {
            this.handleClose();
            window.location = '/post?id=' + this.props.parentId;
        });
    };

    handleOpen(id) {
        this.setState({open: true, commentId: id});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({
          commentBody: event.target.value,
        });
    };

    render() {
        const style = {
            margin: 12,
        };

        let comments = this.state.comments;
        let renderComments = comments == null;
        console.log(renderComments)

        return (
            <div className="TextField">
                {renderComments ? (<div></div>) : (
                    comments.map((c) => (
                        <div className="TextField">
                            <Card expanded={true}>
                                <CardHeader
                                    title={c.author}
                                    actAsExpander={true} />
                                <CardText expandable={true}>
                                    {c.body}
                                    <br />
                                    <br />
                                    {c.voteScore}
                                </CardText>
                                <CardActions>
                                    <FlatButton label="+1" secondary={true} onClick={() => this.upVote(c.id)} />
                                    <FlatButton label="-1" secondary={true} onClick={() => this.downVote(c.id)} />
                                    <FlatButton label="Update" primary={true} onClick={() => this.handleOpen(c.id)} />
                                    <Dialog title="Update your Comment!" modal={false} open={this.state.open}
                                        onRequestClose={this.handleClose}>
                                        <TextField hintText="Update Comment" floatingLabelText="Body:" onChange={this.handleChange}/>
                                        <br />
                                        <FlatButton label="Ok" primary={true} keyboardFocused={true}
                                            onClick={() => this.updateComment()} />
                                    </Dialog>
                                    <FlatButton label="Delete" primary={true} onClick={() => this.deleteComment(c.id)} />
                                </CardActions>
                            </Card>
                        </div>
                    )))
                }
            </div>
        );
    }
}

export default Comment;