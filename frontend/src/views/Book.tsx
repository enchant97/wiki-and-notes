import { Component, createResource, For } from 'solid-js';
import { useParams, Link } from "@solidjs/router";
import { getBookFiles } from '../core/api';

const Book: Component = () => {
  const { book_id } = useParams();
  const [loadedFiles] = createResource(book_id, getBookFiles)
  return (
    <>
    <Link class="btn mb-3" href="/wiki">Back To Books</Link>
    <div class="grid grid-cols-3 gap-4">
      <For each={loadedFiles()}>
        {(row) => <Link class="transition card bg-base-100 shadow-xl hover:bg-neutral-focus duration-300" href="/">
          <div class="card-body">
            <h2 class="card-title">{row.title}</h2>
            <p></p>
          </div>
        </Link>}
      </For>
    </div>
    </>
  );
};

export default Book;
