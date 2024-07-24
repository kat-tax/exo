import {useStyles} from 'react-native-unistyles';
import {Trans} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {Switch} from 'react-exo/switch';
import {Slider} from 'react-exo/slider';
import {Checkbox} from 'react-exo/checkbox';
import {Progress} from 'react-exo/progress';
import {Frame} from 'dev/base/Frame';
import {Page} from 'app/base/Page';

export default function ScreenHome() {
  const {theme} = useStyles();
  return (
    <Page
      title={<Trans>Library</Trans>}
      message={<Trans>{`${5} components`}</Trans>}>
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
          value={50}
          thumbColor={theme.colors.primary}
          rangeColor={theme.colors.primary}
          trackColor={theme.colors.secondary}
          onChange={(value) => console.log(value)}
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
