import React, { Component } from 'react';
import './App.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  } from 'material-ui/Table';

  
  class TableArray extends React.Component{
    
    newTime(time) {
      return new Date(time).toDateString();
    };  

      render() {

        let posts = this.props.posts.filter((post) => post.deleted === false);

          return(
            <div>
                <Table 
                onCellClick={function(row, col) {if(col===-1) window.location = '/post?id=' + posts[row].id;}}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn tooltip="Category">Category</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Score">Vote Score</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Title">Title</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Time">Time</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {posts.map((post)=>(
                      <TableRow>
                        <TableRowColumn>{post.category}</TableRowColumn>
                        <TableRowColumn>{post.voteScore}</TableRowColumn>
                        <TableRowColumn>{post.title}</TableRowColumn>
                        <TableRowColumn>{this.newTime(post.timestamp)}</TableRowColumn>
                      </TableRow>
                  ))}
                  </TableBody>
                </Table>
          </div>
          );
      }
  }

  export default TableArray;