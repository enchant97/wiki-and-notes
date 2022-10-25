import { Component } from 'solid-js';
import { Link } from "@solidjs/router";

const App: Component = () => {
  return (
    <div>
      <h1 class="text-4xl font-bold">Wiki & Notes</h1>
      <Link href="/wiki" class="btn btn-primary">Wiki</Link>
    </div>
  );
};

export default App;
