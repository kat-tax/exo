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
            link: '/primitives/asset/icon',
          },
          {
            text: 'Image',
            link: '/primitives/asset/image',
          },
          {
            text: 'Video',
            link: '/primitives/asset/video',
          },
          {
            text: 'Lottie',
            link: '/primitives/asset/lottie',
          },
          {
            text: 'Rive',
            link: '/primitives/asset/rive',
          },
        ],
      },
      {
        text: 'Interface',
        items: [
          {
            text: 'Checkbox',
            link: '/primitives/interface/checkbox',
          },
          {
            text: 'Switch',
            link: '/primitives/interface/switch',
          },
          {
            text: 'Radio',
            link: '/primitives/interface/radio',
          },
          {
            text: 'Slider',
            link: '/primitives/interface/slider',
          },
          {
            text: 'Progress',
            link: '/primitives/interface/progress',
          },
        ],
      },
    ],
  },
  /*{
    text: 'Hooks',
    collapsed: false,
    items: [
      {
        text: 'Primitives',
        collapsed: false,
        items: [
          {
            text: 'useVariants',
            link: '/primitives/hooks/Variants',
          },
        ],
      },
    ],
  },*/
]