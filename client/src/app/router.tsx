import {Router as _, Routes, Route} from 'react-exo/navigation';
import {PageSuspense as $} from 'app/base/PageSuspense';
import {Layout, Screen} from 'app/routes';
import {history} from 'app/store';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<$><Layout.Main/></$>}>
          <Route index element={<$><Screen.Home/></$>}/>
          <Route path="calendar" element={<$><Screen.Calendar/></$>}/>
          <Route path="notes" element={<$><Screen.TaskList/></$>}/>
          <Route path="notes/:id" element={<$><Screen.TaskDetails/></$>}/>
          <Route path="tasks" element={<$><Screen.TaskList/></$>}/>
          <Route path="tasks/:id" element={<$><Screen.TaskDetails/></$>}/>
          <Route path="design" element={<$><Screen.Design/></$>}/>
          <Route path="library" element={<$><Screen.Library/></$>}/>
          <Route path="settings" element={<$><Screen.Settings/></$>}/>
        </Route>
      </Routes>
    </_>
  );
}
