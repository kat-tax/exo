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
        text: 'Widgets',
        items: [
          {
            text: 'Checkbox',
            link: '/primitives/widgets/checkbox',
          },
          {
            text: 'Switch',
            link: '/primitives/widgets/switch',
          },
          {
            text: 'Radio',
            link: '/primitives/widgets/radio',
          },
          {
            text: 'Slider',
            link: '/primitives/widgets/slider',
          },
          {
            text: 'Progress',
            link: '/primitives/widgets/progress',
          },
        ],
      },
      {
        text: 'Services',
        items: [
          {
            text: 'Device',
            link: '/primitives/services/device',
          },
          {
            text: 'Navigation',
            link: '/primitives/services/navigation',
          },
          {
            text: 'Storage',
            link: '/primitives/services/storage',
          },
        ],
      },
      {
        text: 'Utilities',
        items: [
          {
            text: 'Form',
            link: '/primitives/utilities/form',
          },
          {
            text: 'Gesture',
            link: '/primitives/utilities/gesture',
          },
          {
            text: 'Motion',
            link: '/primitives/utilities/motion',
          },
        ],
      },
    ],
  },
]