import { Component, createSignal, onMount } from 'solid-js';
import { Link, useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
import { defaultApiUrl } from '../core/helpers';
import Api from '../core/api';

const NewAccount: Component = () => {
  const navigate = useNavigate()
  const [login] = useLogin()
  const [apiUrl, setApiUrl] = createSignal(login()?.apiUrl || defaultApiUrl() || null)
  const [username, setUsername] = createSignal("")

  onMount(() => { if (login() !== null) navigate("/") })

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let currApiUrl = apiUrl()
    let currUsername = username().trim()
    if (currApiUrl && currUsername) {
      // remove trailing slash from url
      currApiUrl = currApiUrl.replace(/\/$/, "")
      // create unique api to use specified api url
      let tempApi = new Api(null)
      tempApi.defaultApiUrl = currApiUrl
      // TODO handle possible errors
      await tempApi.postUser({ username: currUsername })
      navigate("/login")
    }
  }

  return (
    <form class="hero min-h-screen bg-base-200" onSubmit={handleSubmit}>
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Create Account</h1>
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
              <div class="form-control">
                <label class="label" for="username">Username:</label>
                <input
                  class="input input-bordered"
                  type="text" id="username" name="username"
                  value={username()}
                  onInput={(e) => setUsername(e.currentTarget.value)}
                  required
                />
              </div>
              <div class="btn-group btn-group-vertical mt-6">
                <button class="btn btn-primary" type="submit">Create Account</button>
                <Link class="btn" href="/login">Login Instead?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewAccount;
