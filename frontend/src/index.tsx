/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router, Routes } from '@solidjs/router';
import './index.css';
import App from './App';
import Books from './views/Books';
import Book from './views/Book';
import { LoginProvider } from './contexts/LoginProvider';
import Login from './views/Login';
import Logout from './views/Logout';
import NewAccount from './views/NewAccount';
import { ApiProvider } from './contexts/ApiProvider';

render(() =>
  <LoginProvider>
    <ApiProvider>
      <Router>
        <Routes>
          <Route path='/' component={App} />
          <Route path='/create-account' component={NewAccount} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/wiki' component={Books} />
          <Route path='/wiki/:book_id' component={Book} />
        </Routes>
      </Router>
    </ApiProvider>
  </LoginProvider>,
  document.getElementById('root') as HTMLElement
);
