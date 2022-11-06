import { Component, Show } from 'solid-js';
import { Link } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';

const Header: Component = () => {
  const [login] = useLogin();

  return (
    <header class="navbar bg-base-200 shadow-xl mb-6">
      <div class="navbar-start">
        <Link class="btn btn-ghost normal-case text-xl" href="/">Wiki & Notes</Link>
      </div>
      <nav class="navbar-end">
        <Show when={login() !== null} fallback={<Link href="/login" class="btn btn-outline">Login</Link>}>
          <div class="dropdown dropdown-end">
            <span tabindex="0" class="btn btn-square">Me</span>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-6 p-2 shadow-lg bg-base-100 rounded-box w-52">
              <li><Link href="/me">Profile</Link></li>
              <li><Link href="/logout">Logout</Link></li>
            </ul>
          </div>
        </Show>
      </nav>
    </header>
  );
};

export default Header;
