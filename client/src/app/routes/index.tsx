import {Router as _, Routes, Route} from 'react-exo/navigation';
import {history} from 'app/data';
import {layout, screen} from './provider';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<layout.app/>}>
          {/* General */}
          <Route index element={<screen.home.index/>}/>
          <Route path="settings" element={<screen.settings.index/>}/>
          {/* Dev Mode */}
          <Route path="design" element={<screen.dev.index/>}/>
        </Route>
      </Routes>
    </_>
  );
}
