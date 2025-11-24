import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Screen} from 'app/ui/screen';
import {Grid, GridCell} from 'app/ui/grid';
import {Icon} from 'react-exo/icon';
import {useNavigation} from '@react-navigation/native';

export default function ScreenWorld(_: ReactNavigation.ScreenProps<'WorldOverview'>) {
  const {t} = useLingui();
  return (
    <Screen>
      <View style={styles.root}>
        <Grid>
          <WorldTile
            link="WorldMap"
            icon="ph:map-trifold"
            title={t`Map`}
          />
          <WorldTile
            link="WorldTasksAll"
            icon="ph:list-checks"
            title={t`Tasks`}
          />
          <WorldTile
            link="WorldCalendar"
            icon="ph:calendar-dots"
            title={t`Calendar`}
          />
        </Grid>
      </View>
    </Screen>
  );
}

interface WorldTileProps {
  link: string;
  icon: string;
  title: string;
}

function WorldTile(props: WorldTileProps) {
  const nav = useNavigation();
  return (
    <GridCell
      focusKey={props.link}
      onPress={() => nav.navigate(props.link as any)}>
      <View style={styles.tile}>
        <Icon
          name={props.icon}
          size={32}
          uniProps={(theme) => ({
            color: theme.colors.foreground,
          })}
        />
        <Text
          selectable={false}
          style={styles.tileTitle}>
          {props.title}
        </Text>
      </View>
    </GridCell>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    padding: theme.display.space2,
  },
  tile: {
    flex: 1,
    gap: theme.display.space3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.display.radius3,
    backgroundColor: theme.colors.secondary,
  },
  tileTitle: {
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
  },
}));
