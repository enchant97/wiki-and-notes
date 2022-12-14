import { Component, createEffect, createSignal, Show } from 'solid-js';
import { createStore } from "solid-js/store";
import { Link, useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
import { defaultApiUrl } from '../core/helpers';
import { getTempApi } from '../core/api';
import { ApiError } from '../core/exceptions';
import { useToast, ToastTypes } from '../contexts/ToastProvider';

const Login: Component = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useLogin();
  const { push: pushToast } = useToast();
  const [loginLoading, setLoginLoading] = createSignal(false);
  const [loginForm, setLoginForm] = createStore({
    apiUrl: login()?.apiUrl || defaultApiUrl(),
    username: "",
  })

  createEffect(() => { if (login() !== null) navigate("/") })

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let currApiUrl = loginForm.apiUrl.replace(/\/$/, "");
    let currUsername = loginForm.username.trim()
    if (currApiUrl && currUsername) {
      setLoginLoading(true);
      let tempApi = getTempApi(currApiUrl);
      try {
        let token = await tempApi.postLogin({ username: currUsername })
        setLogin({ apiUrl: currApiUrl, token })
      } catch (err) {
        if (err instanceof ApiError) {
          pushToast({ message: err.message, type: ToastTypes.Error })
        } else {
          throw err;
        }
      } finally {
        setLoginLoading(false);
      }
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
                <Show
                  when={loginLoading() === false}
                  fallback={<button type="button" class="btn btn-disabled loading" disabled>Login</button>}
                >
                  <button class="btn btn-primary" type="submit">Login</button>
                </Show>
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
