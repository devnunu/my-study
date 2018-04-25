
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import './assets/style.scss';

class App extends Component<{}, {}> {
  render() {
    return (<div className='app'>
      <h1>Hello World!</h1>
      <p>Foo to the barz</p>
    </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root'),
);
