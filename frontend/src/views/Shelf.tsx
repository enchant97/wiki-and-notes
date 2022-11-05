import { Component, createResource } from 'solid-js';
import { useNavigate, useParams } from "@solidjs/router";
import Api from '../core/api';
import { useApi } from '../contexts/ApiProvider';
import { ApiError, ApiErrorTypes } from '../core/exceptions';
import { ToastTypes, useToast } from '../contexts/ToastProvider';

const Shelf: Component = () => {
  const { shelfTitle } = useParams();
  const navigate = useNavigate();
  const [api] = useApi()
  const { push: pushToast } = useToast();

  const loadShelf = async (api: Api) => {
    try {
      let ids = await api.postConvertUrl({ shelfTitle: shelfTitle });
      return await api.getShelfById(ids.shelfId);
    } catch (err) {
      if (err instanceof ApiError) {
        pushToast({ message: err.message, type: ToastTypes.Error });
        switch (err.cause?.errorType) {
          case ApiErrorTypes.NotFound:
            navigate("/404");
            break;
        }
      } else {
        throw err;
      }
    }
  }

  const [loadedShelf] = createResource(api, loadShelf)

  return (
    <div class="bg-base-200 p-4">
      <h1 class="text-4xl">{loadedShelf()?.title}</h1>
    </div>
  );
};

export default Shelf;
