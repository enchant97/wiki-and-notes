/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router, Routes } from '@solidjs/router';
import './index.css';
import App from './App';
import Books from './views/Books';
import Book from './views/Book';

render(() =>
  <Router>
    <Routes>
      <Route path='/' component={App} />
      <Route path='/wiki' component={Books} />
      <Route path='/wiki/:book_id' component={Book} />
    </Routes>
  </Router>,
  document.getElementById('root') as HTMLElement
);
