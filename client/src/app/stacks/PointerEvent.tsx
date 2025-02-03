import {useScheme} from 'app/hooks/useScheme';
import type {PointerEventProps} from './PointerEvent.types';

export function PointerEvent(props: PointerEventProps) {
  const [scheme] = useScheme();
  return (
    <div
      className={`_p ${scheme}`}
      ref={props.dragRef as unknown as React.RefObject<HTMLDivElement>}
      onClick={props.onPress}
      onDoubleClick={props.onDoublePress}>
      {props.children}
    </div>
  );
}
