import {useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';

import {Icon} from 'react-exo/icon';
import {Switch} from 'react-exo/switch';
import {Slider} from 'react-exo/slider';
import {Checkbox} from 'react-exo/checkbox';
import {Progress} from 'react-exo/progress';

import {Page} from 'app/interface/Page';
import {Frame} from 'dev/stacks/Frame';

export default function ScreenHome() {
  const [slider, setSlider] = useState(0);
  const {theme} = useStyles();
  const {t} = useLingui();

  return (
    <Page
      title={t`Library`}
      message={t`${5} components`}>
      <Frame title="Icon">
        <Icon
          name="ph:cat"
          size={36}
          color={theme.colors.primary}
        />
      </Frame>
      <Frame title="Checkbox">
        <Checkbox
          boxColor={theme.colors.border}
          boxColorOn={theme.colors.primary}
          indicatorColor={theme.colors.primary}
        />
      </Frame>
      <Frame title="Switch">
        <Switch
          value={false}
          onColor={theme.colors.primary}
          thumbColor={theme.colors.background}
          offColor={theme.colors.input}
        />
      </Frame>
      <Frame title="Slider">
        <Slider
          step={1}
          value={slider}
          lowerLimit={0}
          upperLimit={100}
          thumbColor={theme.colors.primary}
          rangeColor={theme.colors.primary}
          trackColor={theme.colors.secondary}
          onChange={value => setSlider(value)}
        />
      </Frame>
      <Frame title="Progress">
        <Progress
          progress={50}
          fullWidth={true}
          progressColor={theme.colors.primary}
        />
      </Frame>
    </Page>
  );
}
