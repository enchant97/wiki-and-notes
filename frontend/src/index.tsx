/* @refresh reload */
import { Portal, render } from 'solid-js/web';
import { Route, Router, Routes } from '@solidjs/router';
import './index.css';
import App from './App';
import Shelf from './views/Shelf';
import { LoginProvider } from './contexts/LoginProvider';
import Login from './views/Login';
import Logout from './views/Logout';
import NewAccount from './views/NewAccount';
import { ApiProvider } from './contexts/ApiProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastProvider } from './contexts/ToastProvider';
import Toasts from './components/Toasts';
import NotFound from './views/NotFound';
import Me from './views/Me';

render(() =>
  <ToastProvider>
    <LoginProvider>
      <ApiProvider>
        <Router>
          <Portal><Toasts /></Portal>
          <Header />
          <Routes>
            <Route path='*' component={NotFound} />
            <Route path='/' component={App} />
            <Route path='/404' component={NotFound} />
            <Route path='/create-account' component={NewAccount} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/me' component={Me} />
            <Route path='/:shelfTitle' component={Shelf} />
          </Routes>
          <Footer />
        </Router>
      </ApiProvider>
    </LoginProvider>
  </ToastProvider>,
  document.getElementById('root') as HTMLElement
);
