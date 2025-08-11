import {Router as _, Routes, Route} from 'react-exo/navigation';
import {layout, screen} from 'app/lib/nav';
import {history} from 'app/data';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<layout.app/>}>
          {/* Home */}
          <Route index element={<screen.home.dashboard/>}/>
          <Route path="shortcut/:id" element={<screen.home.shortcut/>}/>
          <Route path="lists" element={<screen.home.lists/>}/>
          <Route path="list/:id" element={<screen.home.list/>}/>
          <Route path="list/:id/edit" element={<screen.home.list_edit/>}/>
          {/* Settings */}
          <Route path="settings" element={<screen.settings.index/>}/>
          {/* Dev Mode */}
          <Route path="design" element={<screen.dev.design/>}/>
        </Route>
      </Routes>
    </_>
  );
}
