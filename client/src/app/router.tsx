import {Router as _, Routes, Route} from 'react-exo/navigation';
import {PageSuspense as $} from 'app/base/PageSuspense';
import {Layout, Screen} from 'app/routes';
import {history} from 'app/store';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<$><Layout.Main/></$>}>
          <Route index element={<$><Screen.Home/></$>}/>
          <Route path="inbox" element={<$><Screen.Home/></$>}/>
          <Route path="map" element={<$><Screen.Map/></$>}/>
          <Route path="events" element={<$><Screen.Calendar/></$>}/>
          <Route path="event/:id" element={<$><Screen.Calendar/></$>}/>
          <Route path="files" element={<$><Screen.Home/></$>}/>
          <Route path="file/:id" element={<$><Screen.Home/></$>}/>
          <Route path="notes" element={<$><Screen.TaskList/></$>}/>
          <Route path="note/:id" element={<$><Screen.TaskDetails/></$>}/>
          <Route path="alarms" element={<$><Screen.Home/></$>}/>
          <Route path="alarm/:id" element={<$><Screen.Home/></$>}/>
          <Route path="design" element={<$><Screen.Design/></$>}/>
          <Route path="library" element={<$><Screen.Library/></$>}/>
          <Route path="settings" element={<$><Screen.Settings/></$>}/>
        </Route>
      </Routes>
    </_>
  );
}
