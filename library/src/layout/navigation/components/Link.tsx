import {useHref} from 'react-router';
import {useCallback, forwardRef} from 'react';
import {useLinkClickHandler} from '../hooks/useLinkClickHandler';

import type {LinkWeb} from './Link.interface';

/**
 * Navigates to a screen when clicked.
 * 
 * @platform Native: renders a Pressable
 * @platform Web: renders an Anchor
 */
export const Link = forwardRef<HTMLAnchorElement, LinkWeb>(
  ({onClick, reloadDocument, replace = false, state, target, to, ...rest}, ref) => {
    const href = useHref(to);
    const click = useLinkClickHandler(to, {replace, state, target});
    const handler = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!e.defaultPrevented && !reloadDocument)
        click(e);
      if (onClick)
        onClick(e);
    }, [click, onClick, reloadDocument]);
  
    return (
      <a
        {...rest}
        ref={ref}
        href={href}
        target={target}
        style={{textDecoration: 'none'}}
        onClick={handler}
      />
    );
  }
);

if (__DEV__) {
  Link.displayName = 'Link';
}
