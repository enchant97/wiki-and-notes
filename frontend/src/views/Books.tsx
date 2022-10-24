import { Component, createResource, For } from 'solid-js';
import { Link } from "@solidjs/router";
import { getBooks } from '../core/api';

const Books: Component = () => {
  const [loadedBooks] = createResource(getBooks)
  return (
    <div class="grid grid-cols-3 gap-4 gap-4">
      <For each={loadedBooks()}>
        {(row) => <Link class="transition card bg-base-100 shadow-xl hover:bg-neutral-focus duration-300" href={"/wiki/" + row.id} >
          <div class="card-body">
            <h2 class="card-title">{row.title}</h2>
            <p></p>
          </div>
        </Link>}
      </For>
    </div>
  );
};

export default Books;
