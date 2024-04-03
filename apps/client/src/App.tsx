import {AppRouter} from 'AppRouter';
import {AppProvider} from 'AppProvider';
import {StoreProvider} from 'store/Provider';

export function App() {
  return (
    <StoreProvider>
      <AppProvider>
        <AppRouter/>
      </AppProvider>
    </StoreProvider>
  )
}
