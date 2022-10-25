import { Component, onMount } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { useLogin } from '../contexts/LoginProvider';
const Logout: Component = () => {
  const navigate = useNavigate();
  const [_, setLogin] = useLogin();

  onMount(() => {
    setLogin(null)
    navigate("/login")
  })

  return ""
};

export default Logout;
