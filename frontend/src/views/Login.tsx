import { Component, createSignal, onMount } from 'solid-js';
import { Link, useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
import { defaultApiUrl } from '../core/helpers';

const Login: Component = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useLogin();

  const [apiUrl, setApiUrl] = createSignal(login()?.apiUrl || defaultApiUrl() || null);

  onMount(() => { if (login() !== null) navigate("/") })

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let currApiUrl = apiUrl();
    if (currApiUrl) {
      // remove trailing slash from url
      currApiUrl = currApiUrl.replace(/\/$/, "");
      setLogin({ apiUrl: currApiUrl })
      navigate("/")
      return
    }
  }

  return (
    <form class="hero min-h-screen bg-base-200" onSubmit={handleSubmit}>
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Login</h1>
          <p class="py-6 text-lg">
            Wiki & Notes.
          </p>
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <div class="form-control">
                <label class="label" for="apiUrl">Api Url:</label>
                <input
                  class="input input-bordered"
                  placeholder="https://"
                  type="url" id="apiUrl" name="apiUrl"
                  value={apiUrl() || ""}
                  onInput={(e) => setApiUrl(e.currentTarget.value)}
                  required
                />
              </div>
              <div class="btn-group btn-group-vertical mt-6">
                <button class="btn btn-primary" type="submit">Login</button>
                <Link class="btn" href="/create-account">Create an Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
