import {Router, Routes, Route} from 'react-exo/router';
import {history} from 'react-exo/redux';

export function AppRouter({Layout, Screen}: AppRoutes) {
  return (
    <Router history={history.state}>
      <Routes>
        <Route path="/" element={<Layout.Main/>}>
          <Route index element={<Screen.Home/>}/>
          <Route path="tasks" element={<Screen.TaskList/>}/>
          <Route path="tasks/:id" element={<Screen.TaskDetails/>}/>
          <Route path="settings" element={<Screen.Settings/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
