import { Component, createResource } from 'solid-js';
import { useParams } from "@solidjs/router";
import Api from '../core/api';
import { useApi } from '../contexts/ApiProvider';

const Shelf: Component = () => {
  const { shelfTitle } = useParams();
  const [api] = useApi()

  const loadShelf = async (api: Api) => {
    return await api.getShelfById(1) // TODO remove hardcode
  }

  const [loadedShelf] = createResource(api, loadShelf)

  return (
    <>
    <h1 class="text-4xl">{loadedShelf()?.title}</h1>
    </>
  );
};

export default Shelf;
