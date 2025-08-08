import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {Link} from 'react-exo/navigation';
import {Icon} from 'app/ui/base';
import {Panel} from 'app/ui/panel';

export default function ScreenNewLink() {
  const {t} = useLingui();

  return (
    <Panel
      title={t`New Link`}
      message={t`Add a new shortcut to your home screen`}
      left={
        <View style={styles.back}>
          <Link to="/">
            <Icon name="ph:arrow-left" size={32} uniProps={
              (theme: any) => ({
                color: theme.colors.foreground,
              })
            }/>
          </Link>
        </View>
      }>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.display.space4,
  },
}));
