import { Component, Show } from 'solid-js';
import { Link } from "@solidjs/router";
import { useLogin } from './contexts/LoginProvider';

const App: Component = () => {
  const [login] = useLogin();

  return (
    <div>
      <h1 class="text-4xl font-bold">Wiki & Notes</h1>
      <Show when={login() === null} fallback={<Link href="/logout" class="btn">Logout</Link>}>
        <Link href="/login" class="btn">Login</Link>
      </Show>
      <Link href="/wiki" class="btn btn-primary">Wiki</Link>
    </div>
  );
};

export default App;
