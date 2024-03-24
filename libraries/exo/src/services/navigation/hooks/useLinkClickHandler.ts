import {useCallback} from 'react';
import {useNavigate, useLocation, useResolvedPath, createPath} from 'react-router';
import type {To} from 'react-router';

/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-link-click-handler
 */
 export function useLinkClickHandler<E extends Element = HTMLAnchorElement>(
  to: To,
  {target, replace: replaceProp, state}: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
  } = {}
): (event: React.MouseEvent<E, MouseEvent>) => void {
  const navigate = useNavigate();
  const location = useLocation();
  const path = useResolvedPath(to);

  return useCallback((event: React.MouseEvent<E, MouseEvent>) => {
    if (
      // Ignore everything but left clicks
      event.button === 0
      // Let browser handle "target=_blank" etc.
      && (!target || target === '_self')
      // Ignore clicks with modifier keys
      && !isModifiedEvent(event)
    ) {
      event.preventDefault();
      // If the URL hasn't changed, a regular <a> will do a replace
      // instead of a push, so do the same here
      const replace = !!replaceProp || createPath(location) === createPath(path);
      navigate(to, {replace, state});
    }
  },
  [location, navigate, path, replaceProp, state, target, to]);
}

function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
