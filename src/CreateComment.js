import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as CommentAPI from './CommentAPI'

class CreateComment extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }
    
    state = {
        comment:"",
    }

    generateUUID () {        
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    saveData () {
        let author = document.getElementById('name').value;
        let body = document.getElementById('body').value;
        let timestamp = new Date().getTime();
        let comment = {id: this.generateUUID(), timestamp: timestamp, body: body, author: author, parentId: this.props.parentId};
        CommentAPI.save(comment).then((data)=>{
            console.log(data);
            this.setState({comment: comment});  
            window.location = '/post?id=' + comment.parentId;         
        });

    }

    render() {
        const style = {
            margin: 12,
        }

        return(
            <div className="TextField">
                <Card>
                    <TextField className="TextField" hintText="Your Name" floatingLabelText="Name:" handleAuthorChange id="name"/>
                        <br />
                    <TextField className="TextField" hintText="Post Body" floatingLabelText="Post Body:"  multiLine={true} id="body"/>
                        <br />
                    <CardActions>
                        <RaisedButton label="Post" primary={true} style={style} onClick={() => this.saveData()} />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CreateComment;