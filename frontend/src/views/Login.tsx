import { Component, createEffect } from 'solid-js';
import { createStore } from "solid-js/store";
import { Link, useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
import { defaultApiUrl } from '../core/helpers';
import Api from '../core/api';

const Login: Component = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useLogin();

  const [loginForm, setLoginForm] = createStore({
    apiUrl: login()?.apiUrl || defaultApiUrl(),
    username: "",
  })

  createEffect(() => { if (login() !== null) navigate("/") })

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let currApiUrl = loginForm.apiUrl;
    let currUsername = loginForm.username.trim()
    if (currApiUrl && currUsername) {
      // remove trailing slash from url
      currApiUrl = currApiUrl.replace(/\/$/, "");

      let tempApi = new Api(null)
      tempApi.defaultApiUrl = currApiUrl
      let token = await tempApi.postLogin({ username: currUsername })

      setLogin({ apiUrl: currApiUrl, token })
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
                  value={loginForm.apiUrl}
                  onInput={(e) => setLoginForm({ ["apiUrl"]: e.currentTarget.value })}
                  required
                />
              </div>
              <div class="form-control">
                <label class="label" for="username">Username:</label>
                <input
                  class="input input-bordered"
                  type="text" id="username" name="username"
                  value={loginForm.username}
                  onInput={(e) => setLoginForm({ ["username"]: e.currentTarget.value })}
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
