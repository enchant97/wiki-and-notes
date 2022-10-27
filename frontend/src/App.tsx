import { Component, createResource, For } from 'solid-js';
import { Link, useNavigate } from "@solidjs/router";
import { useApi } from './contexts/ApiProvider';
import Api from './core/api';
import { ApiError } from './core/exceptions';
import { ToastTypes, useToast } from './contexts/ToastProvider';

const App: Component = () => {
  const navigate = useNavigate();
  const [api] = useApi()
  const { push: pushToast } = useToast();

  const loadShelves = async (api: Api) => {
    try {
      return await api.getShelves()
    } catch (err) {
      if (err instanceof ApiError) {
        pushToast({ message: err.message, type: ToastTypes.Error });
        navigate("/login");
      } else {
        throw err;
      }
    }
    return []
  }

  const [loadedShelves] = createResource(api, loadShelves)

  return (
    <div class="grid grid-cols-3 gap-4 gap-4">
      <For each={loadedShelves()}>
        {(row) => <Link class="transition card bg-base-200 shadow-xl hover:bg-neutral-focus duration-300" href={"/" + row.systemTitle}>
          <div class="card-body">
            <h2 class="card-title">{row.title}</h2>
          </div>
        </Link>}
      </For>
    </div>
  );
};

export default App;
