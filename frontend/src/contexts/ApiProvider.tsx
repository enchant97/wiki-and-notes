import { createSignal, createContext, useContext, JSX, createEffect } from "solid-js";
import Api from "../core/api";
import { useLogin } from "./LoginProvider";

type ApiContextProps = {
}
const makeApiContext = (_props: ApiContextProps) => {
  const [login] = useLogin()
  const [api, setApi] = createSignal<Api>(new Api(null))
  // ensure api is recreated when login state changes
  createEffect(() => setApi(new Api(login())))
  return [
    api,
  ] as const;
}
type ApiProviderProps = {
  children: JSX.Element
}
export const ApiProvider = (props: ApiProviderProps) => {
  let accessor = makeApiContext(props);
  return (
    <ApiContext.Provider value={accessor}>
      {props.children}
    </ApiContext.Provider>
  );
}
type ApiContextType = ReturnType<typeof makeApiContext>;
export const ApiContext = createContext<ApiContextType>();
export const useApi = () => useContext(ApiContext)!;
