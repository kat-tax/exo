import {ReduxProvider} from 'react-exo/redux';
import {Loading} from 'core/components/Loading';
import store from 'store';

export function AppStore(props: React.PropsWithChildren) {
  return (
    <ReduxProvider store={store} loading={<Loading/>}>
      {props.children}
    </ReduxProvider>
  )
}
