import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle'; 
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TableArray from './TableArray';
import AppBar from 'material-ui/AppBar';
import * as CategoryAPI from './CategoryAPI';
import Chip from 'material-ui/Chip';
import {cyan100, cyan300} from 'material-ui/styles/colors';
import './App.css';  
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
  
  class FilterByCategory extends React.Component {

    state = {
        category: '',
        posts: [],
    }

    componentDidMount() {
        let category = this.props.location.search;
        category = category.toLowerCase().split('=')[1]
        CategoryAPI.getPost(category).then((posts) => {
          this.setState({posts: posts, category: category})
        })
      }
    
      render() {
          const style = {
            marginRight: 20,
          };

          let c = this.state.category;
          let cLower = this.state.category.split(c[0])[1];
          let cUpper = this.state.category.charAt(0).toUpperCase();
          let cn = cUpper.concat(cLower);
          
          return(
            <div className="MainView">
                <div className="ReadableApp">
                    <AppBar title="Readable App" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                </div>
                <div className="CategoriesBar">
                    <Card className="TextField">
                        <h3>Category</h3>
                        <Chip backgroundColor={cyan100}>
                            {cn}
                        </Chip>
                        <hr/>
                        <TableArray posts={this.state.posts}/>
                    </Card>
                </div>
                <FloatingActionButton className="floating-menu"style={style} onClick={function(event) {window.location = '/newpost'}}>
                    <ContentAdd />
              </FloatingActionButton>
            </div>
          );
      }
  }

  export default FilterByCategory;