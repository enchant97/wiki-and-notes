import { Component, createEffect, createSignal, Show } from 'solid-js';
import { createStore } from "solid-js/store";
import { Link, useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
import { defaultApiUrl } from '../core/helpers';
import { getTempApi } from '../core/api';
import { useToast, ToastTypes } from '../contexts/ToastProvider';
import { ApiError } from '../core/exceptions';

const NewAccount: Component = () => {
  const navigate = useNavigate()
  const [login] = useLogin()
  const { push: pushToast } = useToast();
  const [submitLoading, setSubmitLoading] = createSignal(false);
  const [newAccForm, setNewAccForm] = createStore({
    apiUrl: login()?.apiUrl || defaultApiUrl(),
    username: "",
  });

  createEffect(() => { if (login() !== null) navigate("/") })

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let currApiUrl = newAccForm.apiUrl.replace(/\/$/, "");
    let currUsername = newAccForm.username.trim();
    if (currApiUrl && currUsername) {
      setSubmitLoading(true);
      let tempApi = getTempApi(currApiUrl);
      try {
        await tempApi.postUser({ username: currUsername });
        pushToast({ message: "account created", type: ToastTypes.Success });
        navigate("/login");
      } catch (err) {
        if (err instanceof ApiError) {
          pushToast({ message: err.message, type: ToastTypes.Error });
        } else {
          throw err;
        }
      } finally {
        setSubmitLoading(false);
      }
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
                  value={newAccForm.apiUrl}
                  onInput={(e) => setNewAccForm({ ["apiUrl"]: e.currentTarget.value })}
                  required
                />
              </div>
              <div class="form-control">
                <label class="label" for="username">Username:</label>
                <input
                  class="input input-bordered"
                  type="text" id="username" name="username"
                  value={newAccForm.username}
                  onInput={(e) => setNewAccForm({ ["username"]: e.currentTarget.value })}
                  required
                />
              </div>
              <div class="btn-group btn-group-vertical mt-6">
                <Show
                  when={submitLoading() === false}
                  fallback={<button type="button" class="btn btn-disabled loading" disabled>Create Account</button>}
                >
                  <button class="btn btn-primary" type="submit">Create Account</button>
                </Show>
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
