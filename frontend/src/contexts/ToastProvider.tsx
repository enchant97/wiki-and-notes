import { createContext, useContext, JSX } from "solid-js";
import { createStore } from "solid-js/store";

export enum ToastTypes {
  Info,
  Success,
  Warning,
  Error,
}

export type Toast = {
  message: string
  type?: ToastTypes
}

const makeToastContext = (_props: any) => {
  const [toasts, setToasts] = createStore<Toast[]>([]);
  const pushToast = (toast: Toast) => {
    setToasts(toasts.concat(toast));
  }
  const removeToast = (toRemove: Toast) => {
    let newToasts = toasts.filter((toast, _i) => { if (toast !== toRemove) return toast });
    setToasts(newToasts);
  }
  return {
    toasts,
    push: pushToast,
    remove: removeToast,
  } as const;
}
type ToastProviderProps = {
  children: JSX.Element
}
export const ToastProvider = (props: ToastProviderProps) => {
  let accessor = makeToastContext(props);
  return (
    <ToastContext.Provider value={accessor}>
      {props.children}
    </ToastContext.Provider>
  );
}
type ToastContextType = ReturnType<typeof makeToastContext>;
export const ToastContext = createContext<ToastContextType>();
export const useToast = () => useContext(ToastContext)!;
3
