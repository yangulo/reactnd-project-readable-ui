import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as PostAPI from './PostAPI'

class NewPost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {category: 0};
      }
    
      state = {
        post:"",
    }

    handleChange = (event, index, value) => this.setState({value});

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
        let title = document.getElementById('title').value;
        let body = document.getElementById('body').value;
        let timestamp = new Date().getTime();
        let category = this.state.category;
        let post = {id:this.generateUUID(), title:title, timestamp:timestamp, body:body, author:author, category:category};
        this.setState({post: post});
        PostAPI.save(post).then((data)=>{
            console.log(data);
            window.location = "/";
        });
    }

    handleChange = (event, index, category) => {
        this.setState({category});
    };

    render(){
        const style = {
            margin: 12,
          };

        return(
            <div className="NewPost">
                <AppBar title="New Post" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <div className="ReadablePost">
                    <h3>Write a New Post!</h3> 
                    <hr/>
                    <Card>
                        <TextField className="TextField" hintText="Your Name" floatingLabelText="Name:" 
                         id="name"/>
                        <br />
                        <TextField className="TextField" hintText="Post Title" floatingLabelText="Title:" 
                        id="title"/>
                        <br />
                        <SelectField className="TextField" floatingLabelText="Category" value={this.state.category}
                        onChange={this.handleChange}>
                            <MenuItem value={"react"} primaryText="React" />
                            <MenuItem value={"redux"} primaryText="Redux" />
                            <MenuItem value={"udacity"} primaryText="Udacity" />
                        </SelectField>
                        <br />
                        <TextField className="TextField" hintText="Post Body" floatingLabelText="Post Body:"  multiLine={true} 
                        id="body"/>
                        <br />
                        <CardActions>
                            <RaisedButton label="Post" primary={true} style={style} onClick={() => this.saveData()}/>
                        </CardActions>
                    </Card>
                    <br/>
                </div>
            </div>
        );
    }
}

export default NewPost;