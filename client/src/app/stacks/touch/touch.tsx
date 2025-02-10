import {useTheme} from 'app/hooks/use-display';
import type {TouchProps} from './touch.types';

export function Touch(props: TouchProps) {
  const [scheme] = useTheme();
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
