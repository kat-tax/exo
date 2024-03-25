import {AppRouter} from 'AppRouter';
import {AppProvider} from 'AppProvider';
import {StoreProvider} from 'common/store/Provider';

export function App() {
  return (
    <StoreProvider>
      <AppProvider>
        <AppRouter/>
      </AppProvider>
    </StoreProvider>
  )
}
