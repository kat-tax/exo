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
    HomeDashboard: {
      label: t`Dashboard`,
      path: '',
      icon: 'ph:squares-four',
      iconNative: () => require('../icons/PhSquaresFour.png'),
    },
    HomeShortcut: {
      label: t`Shortcut`,
      path: 'shortcut/:id',
    },
    NotFound: {
      label: t`Not Found`,
      path: '*',
    },
    Settings: {
      label: t`Settings`,
      path: 'settings',
      icon: 'ph:gear',
      iconNative: () => require('../icons/PhGear.png'),
    },
    TasksListAll: {
      label: t`Lists`,
      path: 'lists',
      icon: 'ph:list-checks',
      iconNative: () => require('../icons/PhListChecks.png'),
    },
    TasksListDetails: {
      label: t`Details`,
      path: 'list/:id',
      icon: 'ph:list-checks',
    },
    TasksListEdit: {
      label: t`Edit`,
      path: 'list/:id/edit',
      icon: 'ph:list-checks',
    },
    DevDesign: {
      label: t`Design`,
      path: 'design',
      icon: 'ph:palette',
    },
    DevCharts: {
      label: t`Charts`,
      path: 'charts',
      icon: 'ph:chart-line',
    },
  };

  return {
    config,
    links,
  };
}
