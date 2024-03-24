import {GestureResponderEvent} from 'react-native';
import {useNavigate} from 'react-router';
import type {To} from 'react-router';

/**
 * Handles the press behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same press behavior we
 * use in our exported `<Link>`.
 */
 export function useLinkPressHandler(
  to: To,
  {replace, state}: {
    replace?: boolean;
    state?: any;
  } = {}
): (event: GestureResponderEvent) => void {
  const navigate = useNavigate();
  return function handlePress() {
    navigate(to, {replace, state});
  };
}
