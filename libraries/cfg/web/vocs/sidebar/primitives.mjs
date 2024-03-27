/** @type {import('vocs').SideBarItem[]} */

export default [
  {
    text: 'Primitives',
    collapsed: false,
    items: [
      {
        text: 'Assets',
        items: [
          {
            text: 'Icon',
            link: '/primitives/assets/icon',
          },
          {
            text: 'Image',
            link: '/primitives/assets/image',
          },
          {
            text: 'Video',
            link: '/primitives/assets/video',
          },
          {
            text: 'Lottie',
            link: '/primitives/assets/lottie',
          },
          {
            text: 'Rive',
            link: '/primitives/assets/rive',
          },
        ],
      },
      {
        text: 'Services',
        items: [
          {
            text: 'Navigation',
            link: '/primitives/services/navigation',
          },
          {
            text: 'Storage',
            link: '/primitives/services/storage',
          },
          {
            text: 'Device',
            link: '/primitives/services/device',
          },
          {
            text: 'Form',
            link: '/primitives/services/form',
          },
        ],
      },
      {
        text: 'Interactions',
        items: [
          {
            text: 'Gesture',
            link: '/primitives/interactions/gesture',
          },
          {
            text: 'Motion',
            link: '/primitives/interactions/motion',
          },
        ],
      },
      {
        text: 'Widgets',
        items: [
          {
            text: 'Calendar',
            link: '/primitives/widgets/calendar',
          },
          {
            text: 'Progress',
            link: '/primitives/widgets/progress',
          },
          {
            text: 'Slider',
            link: '/primitives/widgets/slider',
          },
          {
            text: 'Radio',
            link: '/primitives/widgets/radio',
          },
          {
            text: 'Switch',
            link: '/primitives/widgets/switch',
          },
          {
            text: 'Checkbox',
            link: '/primitives/widgets/checkbox',
          },
        ],
      },
    ],
  },
]