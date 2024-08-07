import {GestureProvider} from 'react-exo/gesture';

export function Provider(props: React.PropsWithChildren) {
  return (
    <GestureProvider style={{flex: 1}}>
      {props.children}
    </GestureProvider>
  );
}
