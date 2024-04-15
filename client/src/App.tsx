import {AppStore} from 'AppStore';
import {AppDisplay} from 'AppDisplay';
import {AppProvider} from 'AppProvider';
import {AppRouter, AppRoutes} from 'AppRouter';

export function App(routes: AppRoutes) {
  return (
    <AppStore>
      <AppProvider>
        <AppDisplay>
          <AppRouter {...routes}/>
        </AppDisplay>
      </AppProvider>
    </AppStore>
  )
}
