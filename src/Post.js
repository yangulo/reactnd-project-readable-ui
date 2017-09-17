import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './App.css';
import FlatButton from 'material-ui/FlatButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import * as PostAPI from './PostAPI';
import CreateComment from "./CreateComment";
import Comment from "./Comments";
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


class Post extends React.Component{

    state = {
        post: {},
        open: false
    }

    getId() {
        let id = this.props.location.search;
        id = id.split('=')[1]
        return id;
    }

    componentDidMount() {
        let id = this.getId();
        PostAPI.getUniquePost(id).then((post) => {
          this.setState({post: post})
        })
    }

    upVote () {
        let id = this.getId();
        PostAPI.upVote(id).then((data)=>{
            this.state.post.voteScore = this.state.post.voteScore + 1;
            let post = this.state.post;
            this.setState({post: post});
        });
    }

    downVote () {
        let id = this.getId();
        PostAPI.downVote(id).then((data)=>{
            this.state.post.voteScore = this.state.post.voteScore - 1;
            let post = this.state.post;
            this.setState({post: post});
        });
    }

    deletePost (id) {
        PostAPI.removePost(id).then((data)=>{
            let post = this.state.post;
            this.setState({post: post});
            console.log(post);
            window.location = "/";
        });
    }

    updatePost () {
        let id = this.getId();
        let body = document.getElementById('bodyy').value;
        let title = document.getElementById('title').value;
        PostAPI.update(id, title, body).then((data)=>{
            this.handleClose();
            window.location = "/post?id="+id;
        });
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
      };
   
    render() {
        
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.updatePost()}
            />,
        ];
        
        return(
            <div className="Post">   
                <AppBar title="Post" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                    <div className="TextField">
                        <h3>{this.state.post.title}</h3>
                        <hr/>
                    </div >                       
                    <div className="TextField">
                        <Card expanded={true}>
                            <CardHeader 
                            title={this.state.post.author}
                            subtitle={this.state.post.category}
                            actAsExpander={true}
                            />
                            <CardText expandable={true}>
                                {this.state.post.body}                            
                                <br/>
                                <br/>
                                {this.state.post.voteScore}
                            </CardText>
                            <CardActions>
                                <FlatButton label="+1"  secondary={true} onClick={() => this.upVote()}/>
                                <FlatButton label="-1"  secondary={true} onClick={() => this.downVote()}/>
                                <FlatButton label="Update" primary={true} onClick={this.handleOpen}/>
                                <Dialog title="Update your Post!" actions={actions} modal={false} open={this.state.open}
                                    onRequestClose={this.handleClose}>
                                    <TextField hintText="New Title" floatingLabelText="Title:" id="title"/>
                                    <br/>
                                    <TextField hintText="New Body" floatingLabelText="Body:" id="bodyy"/>
                                </Dialog>
                                <FlatButton label="Delete" primary={true} onClick={() => this.deletePost(this.getId())}/>
                            </CardActions>
                        </Card>
                    </div>
                        <Comment parentId={this.getId()}/>
                         <div className="TextField">
                            <h3>New Comment</h3>
                            <hr/>
                            <CreateComment className="TextField" parentId={this.getId()}/>
                        </div>
            </div>
        );
    }
}

export default Post;