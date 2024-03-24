import {useRef, useMemo, useCallback} from 'react';
import {useLocation, useNavigate, NavigateOptions} from 'react-router';

type SetURLSearchParams = (
  nextInit?: URLSearchParamsInit | undefined,
  navigateOpts?: NavigateOptions | undefined
) => void;

type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type ParamKeyValuePair = [string, string];

/**
 * A convenient wrapper for accessing individual query parameters via the
 * URLSearchParams interface.
 */
 export function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams] {
  const defaultSearchParamsRef = useRef(createSearchParams(defaultInit));
  const location = useLocation();
  const searchParams = useMemo(() => {
    const searchParams = createSearchParams(location.search);
    for (let key of defaultSearchParamsRef.current.keys()) {
      if (!searchParams.has(key)) {
        defaultSearchParamsRef.current.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    }
    return searchParams;
  }, [location.search]);

  const navigate = useNavigate();
  const setSearchParams: SetURLSearchParams = useCallback(
    (nextInit, navigateOpts) => {
      navigate('?' + createSearchParams(nextInit), navigateOpts);
    },
    [navigate]
  );

  return [searchParams, setSearchParams];
}

/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */
 export function createSearchParams(init: URLSearchParamsInit = ''): URLSearchParams {
  return new URLSearchParams(
    typeof init === 'string' ||
    Array.isArray(init) ||
    init instanceof URLSearchParams
      ? init
      : Object.keys(init).reduce((memo, key) => {
          let value = init[key];
          return memo.concat(
            Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
          );
        }, [] as ParamKeyValuePair[])
  );
}
