import {Router as _, Routes, Route} from 'react-exo/navigation';
import {PageSuspense as $} from 'app/base/PageSuspense';
import {Layout, Screen} from 'app/routes';
import {history} from 'app/store';

export function Router() {
  return (
    <_ {...{history}}>
      <Routes>
        <Route path="/" element={<$><Layout.Main/></$>}>
          {/* General */}
          <Route index element={<$><Screen.Home/></$>}/>
          <Route path="inbox" element={<$><Screen.Teaser/></$>}/>
          <Route path="settings" element={<$><Screen.Settings/></$>}/>
          {/* Tools */}
          <Route path="map" element={<$><Screen.Map/></$>}/>
          <Route path="calendar" element={<$><Screen.Calendar/></$>}/>
          <Route path="event/:id" element={<$><Screen.Teaser/></$>}/>
          <Route path="alarms" element={<$><Screen.Teaser/></$>}/>
          <Route path="alarm/:id" element={<$><Screen.Teaser/></$>}/>
          <Route path="notes" element={<$><Screen.TaskList/></$>}/>
          <Route path="note/:id" element={<$><Screen.TaskDetails/></$>}/>
          {/* Media */}
          <Route path="files" element={<$><Screen.Teaser/></$>}/>
          <Route path="file/:id" element={<$><Screen.Teaser/></$>}/>
          <Route path="docs" element={<$><Screen.Teaser/></$>}/>
          <Route path="games" element={<$><Screen.Teaser/></$>}/>
          <Route path="photos" element={<$><Screen.Teaser/></$>}/>
          <Route path="videos" element={<$><Screen.Teaser/></$>}/>
          <Route path="music" element={<$><Screen.Teaser/></$>}/>
          {/* Dev */}
          <Route path="design" element={<$><Screen.Design/></$>}/>
          <Route path="library" element={<$><Screen.Library/></$>}/>
        </Route>
      </Routes>
    </_>
  );
}
