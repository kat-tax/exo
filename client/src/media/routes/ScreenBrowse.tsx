import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {useHfs} from 'media/dir/hfs/hooks/useHfs';
import {HfsDir} from 'media/dir/hfs';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {path} = useLocationPathInfo();
  const {hfs, cmd, ext} = useHfs(path);
  const bar = {hidden: false, transparent: false};

  return (
    <Page fullWidth margin="none">
      <HfsDir {...{hfs, cmd, ext, bar}}/>
    </Page>
  );
}
