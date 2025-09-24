import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {useUnistyles} from 'react-native-unistyles';
import {useTheme} from 'settings/hooks/use-theme';

import cfg from 'config';

import ScreenSettings from 'settings/screen-settings';
import ScreenHomeDashboard from 'home/screen-dashboard';
import ScreenTasksListAll from 'tasks/screen-list-all';

import type {RootStackParamList} from 'app/navigation';

const Tab = createNativeBottomTabNavigator<RootStackParamList>();

export const Router = () => {
  const [scheme] = useTheme();
  const {theme} = useUnistyles();

  return (
    <NavigationContainer
      linking={{
        enabled: true,
        prefixes: [
          'https://exo.ult.dev',
          'exo://',
        ],
      }}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
      documentTitle={{
        enabled: true,
        formatter: (options, _route) => options?.title
          ? `${cfg.APP_NAME} - ${options?.title}`
          : cfg.APP_NAME
      }}
    >
      <Tab.Navigator
        disablePageAnimations
        tabBarStyle={{
          backgroundColor: theme.colors.neutral,
        }}
        tabLabelStyle={{
          fontFamily: theme.font.family,
          fontWeight: theme.font.weight,
          fontSize: theme.font.size,
        }}
        backBehavior="order"
        rippleColor={theme.colors.accent}
        activeIndicatorColor={theme.colors.card}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.foreground,
        }}>
        <Tab.Screen
          name="HomeDashboard"
          component={ScreenHomeDashboard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => require('./temp/PhSquaresFour.png'),
          }}
        />
        <Tab.Screen
          name="TasksListAll"
          component={ScreenTasksListAll}
          options={{
            tabBarLabel: 'Lists',
            tabBarIcon: () => require('./temp/PhListChecks.png'),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={ScreenSettings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: () => require('./temp/PhGear.png'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
