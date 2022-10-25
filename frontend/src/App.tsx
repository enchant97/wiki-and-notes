import { Component, createResource, For } from 'solid-js';
import { Link } from "@solidjs/router";
import { useApi } from './contexts/ApiProvider';
import Api from './core/api';

const App: Component = () => {
  const [api] = useApi()

  const loadShelves = async (api: Api) => {
    return await api.getShelves()
  }

  const [loadedShelves] = createResource(api, loadShelves)

  return (
    <div class="grid grid-cols-3 gap-4 gap-4">
      <For each={loadedShelves()}>
        {(row) => <Link class="transition card bg-base-100 shadow-xl hover:bg-neutral-focus duration-300" href={"/" + row.systemTitle}>
          <div class="card-body">
            <h2 class="card-title">{row.title}</h2>
          </div>
        </Link>}
      </For>
    </div>
  );
};

export default App;
