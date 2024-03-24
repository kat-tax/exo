import {Router, Routes, Route} from 'react-exo/navigation';
import {state} from 'common/store/history';

import {AppLayout} from 'AppLayout';
import {ScreenHome} from 'modules/home/ScreenHome';
import {ScreenTaskList} from 'modules/tasks/ScreenTaskList';
import {ScreenTaskDetails} from 'modules/tasks/ScreenTaskDetails';
import {ScreenSettings} from 'modules/settings/ScreenSettings';

export function AppRouter() {
  return (
    <Router history={state}>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<ScreenHome/>}/>
          <Route path="tasks" element={<ScreenTaskList/>}/>
          <Route path="tasks/:id" element={<ScreenTaskDetails/>}/>
          <Route path="settings" element={<ScreenSettings/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
