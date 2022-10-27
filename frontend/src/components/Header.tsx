import { Component, Show } from 'solid-js';
import { Link } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';

const Header: Component = () => {
  const [login] = useLogin();

  return (
    <header class="navbar bg-base-100">
      <div class="navbar-start">
        <Link class="btn btn-ghost normal-case text-xl" href="/">Wiki & Notes</Link>
      </div>
      <nav class="navbar-end">
        <Show when={login() === null} fallback={<Link href="/logout" class="btn">Logout</Link>}>
          <Link href="/login" class="btn">Login</Link>
        </Show>
      </nav>
    </header>
  );
};

export default Header;
