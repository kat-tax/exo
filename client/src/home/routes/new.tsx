import {Platform, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useNavigate} from 'react-exo/navigation';
import {Panel, PanelSection, PanelItem} from 'app/ui/panel';
import {IconRemote, TextInput} from 'app/ui/base';
import {Button} from 'design';
import {Grid, GridCell} from 'app/ui/grid';

export default function ScreenNewLink() {
  const nav = useNavigate();
  const {t} = useLingui();

  return (
    <Panel
      title={t`New Link`}
      message={t`Add a dashboard shortcut`}
      right={
        <View style={styles.actions}>
          <Button
            label={t`Cancel`}
            mode="Secondary"
            state="Default"
            onPress={() => nav('/')}
          />
          <Button
            label={t`Save`}
            mode="Primary"
            state="Default"
            onPress={() => {
              console.log('save');
              nav('/');
            }}
          />
        </View>
      }>
        <View style={styles.root}>
          <PanelSection title={t`General`}>
            <PanelItem
              label={t`URL`}
              description={t`The web page to link to.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                defaultValue={''}
                placeholder={`https://search.brave.com`}
                onSubmitEditing={() => {}}
                onBlur={() => {}}
              />
            </PanelItem>
            <PanelItem
              label={t`Name`}
              description={t`The display name of the link.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                defaultValue={''}
                placeholder={`Brave`}
                onSubmitEditing={() => {}}
                onBlur={() => {}}
              />
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Appearance`}>
            <PanelItem
              label={t`Icon`}
              description={t`The icon to display for the link.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                defaultValue={''}
                placeholder={`simple-icons:brave`}
                onSubmitEditing={() => {}}
                onBlur={() => {}}
              />
            </PanelItem>
            <PanelItem
              label={t`Color`}
              description={t`The color of the link icon.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                defaultValue={''}
                placeholder={`#888`}
                onSubmitEditing={() => {}}
                onBlur={() => {}}
              />
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Preview`}>
            <Grid>
              <GridCell focusKey="link-preview">
                <View style={styles.link}>
                  <IconRemote
                    name={'simple-icons:brave'}
                    color={'#FB542B'}
                    size={'50%'}
                  />
                </View>
              </GridCell>
            </Grid>
          </PanelSection>
        </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    marginTop: theme.display.space6,
    paddingBottom: theme.display.space9,
    ...Platform.select({
      ios: {
        gap: 0,
      },
      default: {
        gap: theme.display.space8,
      },
    }),
  },
  actions: {
    gap: theme.display.space4,
    flexDirection: {
      initial: 'column',
      xs: 'row',
    },
  },
  input: {
    padding: theme.display.space2,
    paddingHorizontal: theme.display.space3,
    color: theme.colors.foreground,
    fontSize: theme.typography.size2,
    fontWeight: theme.typography.weightLight,
    lineHeight: theme.typography.lineHeight2,
    letterSpacing: theme.typography.letterSpacing2,
    fontFamily: theme.font.family,
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    width: 215,
  },
  link: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
}));
