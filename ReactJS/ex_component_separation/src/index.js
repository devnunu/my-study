import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MyBlog from './components/MyBlog'

ReactDOM.render(
  <AppContainer>
    <MyBlog/>
  </AppContainer>,
  document.getElementById('wrap')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/MyBlog', () => {
    const NextApp = require('./components/MyBlog').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>
      ,
      document.getElementById('wrap')
    )
  });
}
