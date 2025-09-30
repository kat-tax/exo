import {useLingui} from '@lingui/react/macro';
import type {MenuItemList} from 'app/nav/types';

export function useLinkData() {
  const {t} = useLingui();

  const config: Record<string, Array<keyof MenuItemList>> = {
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

  const links: MenuItemList = {
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
        tabBarIcon: () => require('../icons/PhSquaresFour.png'),
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
        tabBarIcon: () => require('../icons/PhGear.png'),
      },
    },
    TasksListAll: {
      linking: 'lists',
      options: {
        title: t`Lists`,
        icon: 'ph:list-checks',
        tabBarIcon: () => require('../icons/PhListChecks.png'),
      },
    },
    TasksListDetails: {
      linking: 'list/:id',
      options: {
        title: t`Details`,
        icon: 'ph:list-checks',
      },
    },
    TasksListEdit: {
      linking: 'list/:id/edit',
      options: {
        title: t`Edit`,
        icon: 'ph:list-checks',
      },
    },
    DevDesign: {
      linking: 'design',
      options: {
        title: t`Design`,
        icon: 'ph:palette',
      },
    },
    DevCharts: {
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
