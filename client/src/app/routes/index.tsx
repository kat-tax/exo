import {Router as _, Routes, Route} from 'react-exo/navigation';
import {Suspense as $} from 'app/stacks/load';
import {history} from 'app/data/store';

import {Layout, Screen} from './loader';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<$><Layout.App/></$>}>
          {/* General */}
          <Route index element={<$><Screen.Home/></$>}/>
          <Route path="inbox" element={<$><Screen.Inbox/></$>}/>
          <Route path="matrix/:room" element={<$><Screen.Room/></$>}/>
          <Route path="storage" element={<$><Screen.Storage/></$>}/>
          <Route path="settings" element={<Screen.Settings/>}/>
          {/* Media */}
          <Route path="browse/*" element={<$><Screen.Browse/></$>}/>
          <Route path="ipfs/*" element={<$><Screen.Ipfs/></$>}/>
          <Route path="ipfs/:cid/:filename" element={<$><Screen.Ipfs/></$>}/>
          {/* World */}
          <Route path="world" element={<$><Screen.World/></$>}/>
          <Route path="news" element={<$><Screen.Teaser/></$>}/>
          <Route path="map" element={<$><Screen.Map/></$>}/>
          <Route path="calendar" element={<$><Screen.Calendar/></$>}/>
          {/* Dev */}
          <Route path="design" element={<$><Screen.Design/></$>}/>
          <Route path="library" element={<$><Screen.Library/></$>}/>
        </Route>
      </Routes>
    </_>
  );
}
