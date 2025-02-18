import {Provider as ReduxProvider} from 'react-exo/redux';
import {Spinner} from 'app/stacks/load';
import store from './store';

export function Data(props: React.PropsWithChildren) {
  return (
    <ReduxProvider store={store} loading={<Spinner/>}>
      {props.children}
    </ReduxProvider>
  )
}
