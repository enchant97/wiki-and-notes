import { useNavigate } from '@solidjs/router';
import { Component, createResource, onMount } from 'solid-js';
import { useApi } from '../contexts/ApiProvider';
import { useLogin } from '../contexts/LoginProvider';
import { ToastTypes, useToast } from '../contexts/ToastProvider';
import { ApiError } from '../core/exceptions';

const Me: Component = () => {
  const [login] = useLogin();
  const [api] = useApi();
  const navigate = useNavigate();
  const { push: pushToast } = useToast();

  onMount(() => {
    if (login() === null) {
      pushToast({ message: "you need to login to use this page", type: ToastTypes.Error });
      navigate("/login");
    }
  });

  const [loadedMe] = createResource(api, async (api) => {
    try {
      return await api.getMe();
    } catch (err) {
      if (err instanceof ApiError) {
        pushToast({ message: err.message, type: ToastTypes.Error });
      } else {
        throw err;
      }
    }
  });

  return (
    <div class='bg-base-200 p-4'>
      <h1 class='text-4xl'>My Profile</h1>
      <div class="flex justify-center avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
          <span class="text-3xl">{loadedMe()?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Me;
