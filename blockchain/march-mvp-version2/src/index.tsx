import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';

require('./index.css');

import { BrowserRouter, Route } from 'react-router-dom';

const PrimaryLayout = () => (
  <div className='primary-layout'>
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path='/' exact component={HomePage} />
      <Route path='/users' component={UsersPage} />
    </main>
  </div>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
