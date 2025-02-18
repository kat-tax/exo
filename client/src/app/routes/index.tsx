import {Router as _, Routes, Route} from 'react-exo/navigation';
import {Suspense as $} from 'app/stacks/load';
import {history} from 'app/data/store';

import {Layout, Screen} from './loader';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<Layout.App/>}>
          {/* General */}
          <Route index element={<Screen.Dashboard/>}/>
          <Route path="settings" element={<Screen.Settings/>}/>
          {/* Dev Mode */}
          <Route path="design" element={<$><Screen.Design/></$>}/>
        </Route>
      </Routes>
    </_>
  );
}
