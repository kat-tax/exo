import {useNavigate} from 'react-router';

import type {To} from 'react-router';
import type {GestureResponderEvent} from 'react-native';

/**
 * Handles the press behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same press behavior we
 * use in our exported `<Link>`.
 */
 export function useLinkPressHandler(
  to: To,
  {replace, state}: {replace?: boolean, state?: unknown} = {}
): (e: GestureResponderEvent) => void {
  const navigate = useNavigate();
  return () => navigate(to, {replace, state});
}
