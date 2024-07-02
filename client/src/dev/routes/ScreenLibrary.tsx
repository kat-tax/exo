import {Trans} from '@lingui/macro';
import {useStyles} from 'react-native-unistyles';
import {Section} from 'dev/base/Section';
import {Page} from 'app/base/Page';
import {Icon} from 'react-exo/icon';
import {Checkbox} from 'react-exo/checkbox';
import {Switch} from 'react-exo/switch';
import {Slider} from 'react-exo/slider';
import {Progress} from 'react-exo/progress';

export default function ScreenHome() {
  const {theme} = useStyles();
  return (
    <Page
      title={<Trans>Library</Trans>}
      message={<Trans>{`${11} components`}</Trans>}>
      <Section title="Icon">
        <Icon
          name="ph:cat"
          size={36}
          color={theme.colors.primary}
        />
      </Section>
      <Section title="Checkbox">
        <Checkbox
          boxColor={theme.colors.border}
          boxColorOn={theme.colors.primary}
          indicatorColor={theme.colors.primary}
        />
      </Section>
      <Section title="Switch">
        <Switch
          value={false}
          onColor={theme.colors.primary}
          thumbColor={theme.colors.background}
          offColor={theme.colors.input}
        />
      </Section>
      <Section title="Slider">
        <Slider
          value={50}
          thumbColor={theme.colors.primary}
          rangeColor={theme.colors.primary}
          trackColor={theme.colors.secondary}
          onChange={(value) => console.log(value)}
        />
      </Section>
      <Section title="Progress">
        <Progress
          progress={50}
          fullWidth={true}
          progressColor={theme.colors.primary}
        />
      </Section>
    </Page>
  );
}
