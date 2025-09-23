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
          <Route path="shortcut/:id" element={<Screen.Home.Shortcut/>}/>
          {/* Tasks */}
          <Route path="lists" element={<Screen.Tasks.ListAll/>}/>
          <Route path="list/:id" element={<Screen.Tasks.ListDetails/>}/>
          <Route path="list/:id/edit" element={<Screen.Tasks.ListEdit/>}/>
          {/* Settings */}
          <Route path="settings" element={<Screen.Settings.Settings/>}/>
          {/* Dev Mode */}
          <Route path="design" element={<Screen.Dev.Design/>}/>
          <Route path="charts" element={<Screen.Dev.Charts/>}/>
        </Route>
      </Routes>
    </_>
  );
}
