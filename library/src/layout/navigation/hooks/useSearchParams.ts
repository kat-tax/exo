import {useRef, useMemo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router';
import type {NavigateOptions} from 'react-router';

type SetURLSearchParams = (
  nextInit?: URLSearchParamsInit | undefined,
  navigateOpts?: NavigateOptions | undefined
) => void;

type ParamKeyValuePair = [string, string];
type URLSearchParamsData = [URLSearchParams, SetURLSearchParams];
type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

/**
 * A wrapper for accessing individual query parameters via URLSearchParams.
 */
export function useSearchParams(init?: URLSearchParamsInit): URLSearchParamsData {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInit = useRef(createSearchParams(init));
  const searchParams = useMemo(() => {
    const params = createSearchParams(location.search);
    for (const key of searchInit.current.keys()) {
      if (!params.has(key)) {
        for (const value of searchInit.current.getAll(key)) {
          params.append(key, value);
        }
      }
    }
    return params;
  }, [location.search]);

  const setSearchParams: SetURLSearchParams = useCallback((init, opts) =>
    navigate(`?${createSearchParams(init)}`, opts)
  , [navigate]);

  return [searchParams, setSearchParams];
}

/**
 * Creates a URLSearchParams object using the given initializer.
 */
 export function createSearchParams(initParams: URLSearchParamsInit = ''): URLSearchParams {
  return new URLSearchParams(
    typeof initParams === 'string'
    || Array.isArray(initParams)
    || initParams instanceof URLSearchParams
      ? initParams
      : Object.keys(initParams).reduce((memo, key) => {
          const value = initParams[key];
          return memo.concat(Array.isArray(value)
            ? value.map((v) => [key, v])
            : [[key, value]]
          );
        }, [] as ParamKeyValuePair[])
  );
}
