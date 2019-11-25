import { useContext } from 'react';
import {
  useRetrieve,
  useError,
  useFetcher,
  Schema,
  ReadShape,
  FetchShape,
  useDenormalized,
  __INTERNAL__
} from 'rest-hooks';

/** If the invalidIfStale option is set we suspend if resource has expired */
export default function hasUsableData(
  cacheReady: boolean,
  fetchShape: Pick<FetchShape<any>, 'options'>
) {
  return !((fetchShape.options && fetchShape.options.invalidIfStale) || !cacheReady);
}

/** Ensure a resource is available; loading and error returned explicitly. */
export function useQuery<Params extends Readonly<object>, S extends Schema>(
  fetchShape: ReadShape<S, Params>,
  params: Params | null
) {
  let maybePromise = useRetrieve(fetchShape, params);
  const state = useContext(__INTERNAL__.StateContext);
  const [denormalized, ready] = useDenormalized(fetchShape, params, state);

  const doFetch = useFetcher(fetchShape);

  const refetch = params ? () => doFetch(params) : () => null;

  const loading =
    !hasUsableData(ready, fetchShape) && maybePromise && typeof maybePromise.then === 'function';

  let error = useError(fetchShape, params, ready);

  return {
    data: denormalized,
    loading,
    refetch,
    error
  };
}
