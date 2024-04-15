import * as Nav from 'react-exo/navigation';
import {history} from 'react-exo/redux';
import {Layout, Screen} from 'app/routes';
import {LazyLoad as $} from 'common/base/LazyLoad';

export function Router() {
  return (
    <Nav.Router history={history.state}>
      <Nav.Routes>
        <Nav.Route path="/" element={<$><Layout.Main/></$>}>
          <Nav.Route index element={<$><Screen.Home/></$>}/>
          <Nav.Route path="tasks" element={<$><Screen.TaskList/></$>}/>
          <Nav.Route path="tasks/:id" element={<$><Screen.TaskDetails/></$>}/>
          <Nav.Route path="settings" element={<$><Screen.Settings/></$>}/>
        </Nav.Route>
      </Nav.Routes>
    </Nav.Router>
  );
}
