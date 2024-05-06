import * as Nav from 'react-exo/navigation';
import {Suspense} from 'react';
import {history} from 'app/store';
import {Layout, Screen} from 'app/routes';
import {PageLoading} from 'core/base/PageLoading';

export function Router() {
  return (
    <Nav.Router {...{history}}>
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

const $ = (props: React.PropsWithChildren) => {
  return (
    <Suspense fallback={<PageLoading/>}>
      {props.children}
    </Suspense>
  );
}
