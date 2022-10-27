import { Component, onMount } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
import { ToastTypes, useToast } from '../contexts/ToastProvider';

const Logout: Component = () => {
  const navigate = useNavigate();
  const [_, setLogin] = useLogin();
  const { push: pushToast } = useToast();

  onMount(() => {
    setLogin(null)
    pushToast({ message: "you have logged out", type: ToastTypes.Success })
    navigate("/login")
  })

  return ""
};

export default Logout;
