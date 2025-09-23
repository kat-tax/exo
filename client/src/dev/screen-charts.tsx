import {useLingui} from '@lingui/react/macro';
import {useTheme} from 'settings/hooks/use-theme';
import {Panel} from 'app/ui/panel';
import {Grid} from 'dev/stacks/grid';
import {Frame} from 'dev/stacks/frame';
import {Chart} from 'react-exo/chart';
import charts from 'react-exo/demo/charts';

export default function ScreenCharts() {
  const [theme] = useTheme();
  const {t} = useLingui();
  return (
    <Panel
      title={t`Charts`}
      message="Apache ECharts v6">
      <Grid>
        {charts.map((chart) => (
          <Frame key={chart.title} title={chart.title} noScroll>
            <Chart theme={theme} height={chart.height} option={chart.option}/>
          </Frame>
        ))}
      </Grid>
    </Panel>
  );
}
