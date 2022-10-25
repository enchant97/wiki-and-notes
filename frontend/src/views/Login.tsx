import { Component, createSignal, onMount } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';

const Login: Component = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useLogin();

  const [apiUrl, setApiUrl] = createSignal(login()?.apiUrl || null);

  onMount(() => { if (login() !== null) navigate("/") })

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let currApiUrl = apiUrl();
    if (currApiUrl) {
      setLogin({ apiUrl: currApiUrl })
      navigate("/")
      return
    }
  }

  return (
    <form class="hero min-h-screen bg-base-200" onSubmit={handleSubmit}>
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login</h1>
          <p class="py-6 text-lg">
            Wiki & Notes.
          </p>
        </div>
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
            <div class="form-control mt-6">
              <button class="btn btn-primary" type="submit">Login</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
