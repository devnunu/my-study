import React from 'react';
import BlogPost from './BlogPost';

export default class MyBlog extends React.Component {
  constructor() {
    super();
    this.state = {posts : [
      {
        "title": "sunt aut facere repellat",
         "body": "quia et suscipit\nsuscipit"
      },
      {
        "title": "qui est essexxxxx",
        "body": "est rerum tempore vitae\nsequi sint"
      }
    ]};

  }

  addCount(number) {
    console.log('log', number);
  }

  render() {

    const mapToComponents = (data) => {
      return data.map((v,i) => {
        return (<BlogPost
            posts={v}
            key={i}
            onClick = {() => this.addCount(i)}/>);
      });
    }

    return (
      <div>
        <h2>My Blog posts :-)</h2>
        <ul>
          {mapToComponents(this.state.posts)}
        </ul>
      </div>
    )
  }
}
