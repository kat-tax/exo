import {Router, Routes, Route, Load} from 'react-exo/router';
import {history} from 'react-exo/redux';

export function AppRouter({Layout, Screen}: AppRoutes) {
  return (
    <Router history={history.state}>
      <Routes>
        <Route path="/" element={<Load><Layout.Main/></Load>}>
          <Route index element={<Load><Screen.Home/></Load>}/>
          <Route path="tasks" element={<Load><Screen.TaskList/></Load>}/>
          <Route path="tasks/:id" element={<Load><Screen.TaskDetails/></Load>}/>
          <Route path="settings" element={<Load><Screen.Settings/></Load>}/>
        </Route>
      </Routes>
    </Router>
  );
}
