import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TableArray from './TableArray';

import './App.css';
import Chips from './ChipArray.js';
import Post from './Post';
import NewPost from './NewPost';
import * as CategoryAPI from './CategoryAPI';
import * as PostAPI from './PostAPI';
import FilterByCategory from './FilterByCategory';

class App extends Component {

  state = {
    categories: [],
    posts: []
  }

  componentDidMount() {
    PostAPI.getAll().then((posts) => {
      console.log(posts);
      this.setState({posts: posts})
    })
    CategoryAPI.getAll().then((categories) => {
      this.setState({categories: categories})
    })
  }

  render() {
    const style = {
      marginRight: 20,
    };

    return (
      <div className="App">
        <Route exact path="/" render={() =>(
          <div className="MainView">
            <div className="ReadableApp">
              <AppBar title="Readable App" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            </div>
            <div className="CategoriesBar">
              <Card className="TextField">
                <h3>Categories</h3>
                  <Chips react="React" redux="Redux" udacity="Udacity"/>
                <hr/>
                <TableArray posts={this.state.posts}/>
              </Card>
            </div>
              <FloatingActionButton className="floating-menu"style={style} onClick={function(event) {window.location = '/newpost'}}>
                <ContentAdd />
              </FloatingActionButton>
          </div>
        )}/>
        <Route path="/newpost" component={NewPost}/>
        <Route path="/post" component={Post}/>
        <Route path="/category" component={FilterByCategory}/>
      </div>
    )
  }
}

export default App;
