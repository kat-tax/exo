import {forwardRef} from 'react';
import {useHref} from 'react-router';
import {useLinkClickHandler} from '../hooks/useLinkClickHandler';
import type {To} from 'react-router';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: To;
  state?: any;
  replace?: boolean;
  /* Web Only */
  reloadDocument?: boolean;
}

/**
 * The public API for rendering a history-aware <a>.
 *
 * @see https://reactrouter.com/docs/en/v6/components/link
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkWithRef({onClick, reloadDocument, replace = false, state, target, to, ...rest}, ref) {
    const href = useHref(to);
    const _handleClick = useLinkClickHandler(to, {replace, state, target});
    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented && !reloadDocument) {
        _handleClick(event);
      }
    }
    return (
      <a
        {...rest}
        ref={ref}
        href={href}
        target={target}
        onClick={handleClick}
      />
    );
  }
);

if (__DEV__) {
  Link.displayName = 'Link';
}
