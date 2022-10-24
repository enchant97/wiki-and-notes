import type { Component } from 'solid-js';
import { Link } from "@solidjs/router";

const App: Component = () => {
  return (
    <Link href="/wiki" class="btn btn-primary">Wiki</Link>
  );
};

export default App;
