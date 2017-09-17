import React, { Component } from 'react';
import './App.css';
import Chip from 'material-ui/Chip';
import {cyan100} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Chips extends React.Component {
    
    render() {
        
        let categories = this.props.categories;
        let react = this.props.react;
        let redux = this.props.redux;
        let udacity = this.props.udacity;

        return (
          <div style={styles.wrapper}>
            <Chip
                onClick={function(event) {window.location = '/category?id=' + react}}
                style={styles.chip}
                backgroundColor={cyan100}>
                {react}
            </Chip>
            <Chip
                onClick={function(event) {window.location = '/category?id=' + redux}}
                style={styles.chip}
                backgroundColor={cyan100}>
                {redux}
            </Chip>
            <Chip
                onClick={function(event) {window.location = '/category?id=' + udacity}}
                style={styles.chip}
                backgroundColor={cyan100}>
                {udacity}
            </Chip>
          </div>
        );
      }
    }

    export default Chips;