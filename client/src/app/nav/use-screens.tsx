import {useLingui} from '@lingui/react/macro';
import type {NavScreens} from 'app/nav';

export function useScreens() {
  const {t} = useLingui();

  const config: Record<string, Array<keyof NavScreens>> = {
    tabs: [
      'HomeDashboard',
      'TasksListAll',
      'Settings',
    ],
    menuTop: [
      'HomeDashboard',
      'TasksListAll',
    ],
    menuDevMenu: [
      'DevDesign',
      'DevCharts',
    ],
    menuFooterIcons: [
      'Settings',
    ],
  } as const;

  const links: NavScreens = {
    NotFound: {
      linking: '*',
      options: {
        title: t`Not Found`,
      },
    },
    HomeDashboard: {
      linking: '',
      options: {
        title: t`Dashboard`,
        icon: 'ph:squares-four',
        tabBarIcon: () => require('./icons/ph-squares-four.png'),
      },
    },
    HomeShortcut: {
      linking: 'shortcut/:id',
      options: {
        title: t`Shortcut`,
      },
    },
    Settings: {
      linking: 'settings',
      options: {
        title: t`Settings`,
        icon: 'ph:gear',
        tabBarIcon: () => require('./icons/ph-gear.png'),
      },
    },
    TasksListAll: {
      linking: 'lists',
      options: {
        title: t`Lists`,
        icon: 'ph:list-checks',
        tabBarIcon: () => require('./icons/ph-list-checks.png'),
      },
    },
    TasksListDetails: {
      linking: 'list/:id',
      options: {
        title: t`List Details`,
      },
    },
    TasksListEdit: {
      linking: 'list/:id/edit',
      options: {
        title: t`Edit List`,
      },
    },
    DevDesign: {
      if: () => __DEV__,
      linking: 'design',
      options: {
        title: t`Design`,
        icon: 'ph:palette',
      },
    },
    DevCharts: {
      if: () => __DEV__,
      linking: 'charts',
      options: {
        title: t`Charts`,
        icon: 'ph:chart-line',
      },
    },
  };

  return {
    config,
    links,
  };
}
