import {Suspense} from 'react';
import {Router, Routes, Route} from 'react-exo/navigation';
import {history} from 'react-exo/redux';
import {Loading} from 'core/components/Loading';

export function AppRouter({Layout, Screen}: AppRoutes) {
  return (
    <Router history={history.state}>
      <Routes>
        <Route path="/" element={<Lazy><Layout.Main/></Lazy>}>
          <Route index element={<Lazy><Screen.Home/></Lazy>}/>
          <Route path="tasks" element={<Lazy><Screen.TaskList/></Lazy>}/>
          <Route path="tasks/:id" element={<Lazy><Screen.TaskDetails/></Lazy>}/>
          <Route path="settings" element={<Lazy><Screen.Settings/></Lazy>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export function Lazy(props: React.PropsWithChildren): React.ReactNode {
  return (
    <Suspense fallback={<Loading/>}>
      {props.children}
    </Suspense>
  );
}
