import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const logo = require('./logo.svg');

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
              <li><Link to="/">홈으로</Link></li>
              <li><Link to="/intro">소개</Link></li>
            </ul>
          </nav>
          <Route exact={true} path="/" render={()=><h3>home</h3>}/>
          <Route exact={true} path="/intro" render={()=><h3>소개</h3>}/>
        </div>
      </Router>
    );
  }
}

export default App;
