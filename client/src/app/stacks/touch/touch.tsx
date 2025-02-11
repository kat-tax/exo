import {useComposedRefs} from 'app/utils/components';
import {useTheme} from 'app/hooks/use-theme';

import type {TouchProps} from './touch.types';

export function Touch(props: TouchProps) {
  const [theme] = useTheme();
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: events handled by focusable
    <div
      ref={useComposedRefs(...props.refs)}
      onClick={props.onPress}
      onDoubleClick={props.onDoublePress}
      className={`_p ${theme}`}
      // biome-ignore lint/a11y/useSemanticElements: needs to be div
      role="button"
      tabIndex={0}>
      {props.children}
    </div>
  );
}
