import { Component, Show } from 'solid-js';
import { Link } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';

const Header: Component = () => {
  const [login] = useLogin();

  return (
    <header class="navbar bg-base-100 shadow-xl mb-6">
      <div class="navbar-start">
        <Link class="btn btn-ghost normal-case text-xl" href="/">Wiki & Notes</Link>
      </div>
      <nav class="navbar-end">
        <Show when={login() !== null} fallback={<Link href="/login" class="btn">Login</Link>}>
          <div class="dropdown dropdown-end">
            <span tabindex="0" class="btn btn-ghost">Me</span>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-6 p-2 shadow-lg bg-base-100 rounded-box w-52">
              <li><a href="">Profile</a></li>
              <li><Link href="/logout">Logout</Link></li>
            </ul>
          </div>
        </Show>
      </nav>
    </header>
  );
};

export default Header;
