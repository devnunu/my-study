import React from 'react';

export default class BlogPost extends React.Component{
  render(){
    return(
      <li onClick={this.props.onClick}>{this.props.posts.title}</li>
    );
  }
}
