import {useLingui} from '@lingui/react/macro';
import {useTheme} from 'settings/hooks/use-theme';
import {Panel} from 'app/ui/panel';
import Charts from 'dev/demo';

export default function ScreenCharts() {
  const [theme] = useTheme();
  const {t} = useLingui();
  return (
    <Panel
      title={t`Charts`}
      message="Apache ECharts v6">
      <Charts {...{theme}}/>
    </Panel>
  );
}
