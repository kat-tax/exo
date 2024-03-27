import {Layout} from 'mod/core/Layout';
import {ScreenHome} from 'mod/home/ScreenHome';
import {ScreenSettings} from 'mod/settings/ScreenSettings';
import {ScreenTaskList} from 'mod/tasks/ScreenTaskList';
import {ScreenTaskDetails} from 'mod/tasks/ScreenTaskDetails';
import {Router, Routes, Route, history} from 'react-exo/navigation';

export function AppRouter() {
  return (
    <Router history={history.state}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ScreenHome/>}/>
          <Route path="tasks" element={<ScreenTaskList/>}/>
          <Route path="tasks/:id" element={<ScreenTaskDetails/>}/>
          <Route path="settings" element={<ScreenSettings/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
