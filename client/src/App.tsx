import {AppStore} from 'AppStore';
import {AppProvider} from 'AppProvider';
import {AppRouter, AppRoutes} from 'AppRouter';

export function App(routes: AppRoutes) {
  return (
    <AppStore>
      <AppProvider>
        <AppRouter {...routes}/>
      </AppProvider>
    </AppStore>
  )
}
