import type {SidebarItem} from 'vocs';

export default {
  text: 'Start',
  link: '/start',
  collapsed: false,
  items: [
    {
      text: 'with Figma',
      link: '/start/figma',
    },
    {
      text: 'with Command Line',
      link: '/start/command',
    },
    {
      text: 'with an Existing Project',
      link: '/start/manual',
    },
  ],
} as SidebarItem;
