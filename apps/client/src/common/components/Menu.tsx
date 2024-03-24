import {View} from 'react-native';
import {Trans} from '@lingui/macro';
import {SafeAreaView} from 'react-exo/safearea';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {MenuItem} from 'common/components/MenuItem';
import {useLists} from 'modules/tasks/hooks/useLists';

export function Menu() {
  const {styles} = useStyles(stylesheet);
  const lists = useLists();
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.fill}>
        <View style={styles.fill}>
          <MenuItem path="/">
            <Trans>Home</Trans>
          </MenuItem>
          {lists.map(list =>
            <MenuItem key={list} path={`/tasks/${list}`}>
              {list}
            </MenuItem>
          )}
          <View style={styles.fill}/>
          <MenuItem path="/settings">
            <Trans>Settings</Trans>
          </MenuItem>
        </View>
      </SafeAreaView>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    padding: 14,
    height: '100%',
    backgroundColor: '#272727',
  },
  fill: {
    flex: 1,
  },
}));

