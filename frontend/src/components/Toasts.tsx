import { Component, For, Match, Switch } from "solid-js";
import { ToastTypes, useToast } from "../contexts/ToastProvider";

const ToastRow: Component<any> = (props) => {
  const { remove: removeToast } = useToast()
  setTimeout(() => {
    removeToast(props.toast);
  }, 6000)
  return (
    <div class={"transition-opacity	duration-400 ease-in-out " + props.class}>
      <div>
        <span>{props.toast.message}</span>
      </div>
    </div>
  );
}

const Toasts: Component = () => {
  const { toasts } = useToast()
  return (
    <div class="toast toast-start">
      <For each={toasts}>
        {(toast) =>
          <Switch>
            <Match when={toast.type === ToastTypes.Info}>
              <ToastRow class="alert alert-info" toast={toast} />
            </Match>
            <Match when={toast.type === ToastTypes.Info}>
              <ToastRow class="alert alert-info" toast={toast} />
            </Match>
            <Match when={toast.type === ToastTypes.Success}>
              <ToastRow class="alert alert-success" toast={toast} />
            </Match>
            <Match when={toast.type === ToastTypes.Error}>
              <ToastRow class="alert alert-error" toast={toast} />
            </Match>
          </Switch>
        }
      </For>
    </div>
  );
};

export default Toasts;
