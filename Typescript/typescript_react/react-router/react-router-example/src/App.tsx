import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch, Redirect, NavLink } from 'react-router-dom';

const logo = require('./logo.svg');

const Post = (props:RouteComponentProps<{postId:string}>) => {
  function goNextPost(){
    const nextPostId = +props.match.params.postId + 1;
    props.history.push(`/posts/${nextPostId}`);
  }
  
  return (
    <div>
      <h3>POST {props.match.params.postId}</h3>
      <button onClick={goNextPost}>Next Post</button>
      <p>{new URLSearchParams( props.location.search).get('body')}</p>
    </div>
  );
};

const PostList = (props:RouteComponentProps<{}>) => {
  return (
    <div>
      <Route exact={true} path={`${props.match.url}`} render={() => <h3>PostList</h3>} />
      <Route path={`${props.match.url}/:postId`} component={Post} />
    </div>
  );
};

const notFound = () => {
  return (
    <h3>Not Found</h3>
  );
};

const Admin = () => {
  const isAdmin = true;
  return isAdmin 
  ? <h3>Admin</h3>
  : <Redirect to="/"/>
  ;
};

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <nav>
            <ul>
              <li><NavLink exact={true} activeStyle= {{fontSize:24}} to="/">홈으로</NavLink></li>
              <li><NavLink activeStyle= {{fontSize:24}} to="/intro">소개</NavLink></li>
              <li><NavLink activeStyle= {{fontSize:24}} to="/admin">관리자페이지</NavLink></li>
            </ul>
          </nav>
          <Switch>
            <Route exact={true} path="/" render={()=><h3>home</h3>}/>
            <Route path="/intro" render={()=><h3>소개</h3>}/>
            <Redirect from="/about" to="/intro"/>
            <Route path="/posts" component={PostList}/>
            <Route path="/admin" component={Admin}/>
            <Route component={notFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
