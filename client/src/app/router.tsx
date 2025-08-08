import {Router as _, Routes, Route} from 'react-exo/navigation';
import {layout, screen} from 'app/lib/nav';
import {history} from 'app/data';

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
