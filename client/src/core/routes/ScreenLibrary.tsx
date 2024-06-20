import {Trans} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {Switch} from 'react-exo/switch';
//import {Checkbox} from 'react-exo/checkbox';
//import {Progress} from 'react-exo/progress';
//import {Slider} from 'react-exo/slider';
import {useStyles} from 'design/styles';
import {Section} from 'core/base/Section';
import {Page} from 'core/base/Page';

export default function ScreenHome() {
  const {theme} = useStyles();
  return (
    <Page title={<Trans>Library</Trans>}>
      <Section title="Icon">
        <Icon
          name="ph:cat"
          size={36}
          color={theme.colors.primary}
        />
      </Section>
      {/* <Section title="Checkbox">
        <Checkbox
          boxColor={theme.colors.border}
          boxColorOn={theme.colors.primary}
          indicatorColor={theme.colors.primary}
        />
      </Section> */}
      {/* <Section title="Slider">
        <Slider
          value={50}
          thumbColor={theme.colors.primary}
          rangeColor={theme.colors.primary}
          trackColor={theme.colors.secondary}
          onChange={(value) => console.log(value)}
        />
      </Section> */}
      <Section title="Switch">
        <Switch
          value={false}
          onColor={theme.colors.primary}
          thumbColor={theme.colors.background}
          offColor={theme.colors.input}
        />
      </Section>
      {/* <Section title="Progress">
        <Progress
          progress={50}
          fullWidth={true}
          progressColor={theme.colors.primary}
        />
      </Section> */}
    </Page>
  );
}
