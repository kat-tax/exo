import {Router as _, Routes, Route} from 'react-exo/navigation';
import {Layout, Screen} from 'app/lib/nav';
import {history} from 'app/data';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<Layout.App/>}>
          {/* Home */}
          <Route index element={<Screen.Home.Dashboard/>}/>
          <Route path="lists" element={<Screen.Home.ListAll/>}/>
          <Route path="list/:id" element={<Screen.Home.ListDetails/>}/>
          <Route path="list/:id/edit" element={<Screen.Home.ListEdit/>}/>
          <Route path="shortcut/:id" element={<Screen.Home.ShortcutEdit/>}/>
          {/* Settings */}
          <Route path="settings" element={<Screen.Settings.Settings/>}/>
          {/* Dev Mode */}
          <Route path="design" element={<Screen.Dev.Design/>}/>
        </Route>
      </Routes>
    </_>
  );
}
