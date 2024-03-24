import {Router, Routes, Route} from 'react-exo/navigation';
import {state} from 'common/store/history';

import {AppLayout} from 'AppLayout';
import {ScreenHome} from 'modules/core/ScreenHome';
import {ScreenSettings} from 'modules/settings/ScreenSettings';
import {ScreenTaskList} from 'modules/tasks/ScreenTaskList';
import {ScreenTaskDetails} from 'modules/tasks/ScreenTaskDetails';

export function AppRouter() {
  return (
    <Router history={state}>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<ScreenHome/>}/>
          <Route path="tasks" element={<ScreenTaskList/>}/>
          <Route path="tasks/:id" element={<ScreenTaskDetails/>}/>
          <Route path="settings" element={<ScreenSettings/>}/>
          {/* #ult-feat <Route path="$path" element={<Screen$name/>}/>*/}
        </Route>
      </Routes>
    </Router>
  );
}
